import mongoose from "mongoose";
// import { comment } from "../models/uomment.js"; // Assuming you have a Comment model
// import { user } from "../models/user.js"; // Assuming you have a User model
import { handleErrorResponse, handleSuccessResponse } from "../utils/responseHandler.js";
export const createComment = async (req, res) => {
    const { content, task } = req.body;

    try {
        // Validate required fields
        if (!content?.trim() || !task?.trim()) {
            return res.status(400).json({ message: "Content and Task fields are required." });
        }

        // Validate task existence
        const taskExists = await Task.findById(task);
        if (!taskExists) {
            return res.status(404).json({ message: "Task not found." });
        }

        // Validate user existence
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User information is missing." });
        }

        const commentByExists = await User.findById(userId);
        if (!commentByExists) {
            return res.status(404).json({ message: "User not found." });
        }

        // Create the comment
        const comment = await Comment.create({
            content: content.trim(),
            task: taskExists._id,
            commentby: commentByExists._id,
        });

        return res.status(201).json({
            data: comment,
            message: "Comment created successfully.",
        });

    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};
export const getAllComments = async (req, res) => {
    try {
        let comments = [];

        switch (req.user.role) {
            case "Team Member":
                // Comments made by the current user
                const userComments = await Comment.find({ commentby: req.user._id })
                    .populate("task", "title")
                    .populate("commentby", "firstName lastName email role");

                // Fetch projects where the user is a team member
                const projects = await Project.find({ teamMembers: req.user._id });
                const projectIds = projects.map((project) => project._id);

                // Comments associated with projects
                const projectComments = await Comment.find({ task: { $in: projectIds } })
                    .populate("task", "title")
                    .populate("commentby", "firstName lastName email role");

                // Merge and remove duplicates
                comments = [...userComments, ...projectComments];
                break;

            case "Project Manager":
                // Fetch tasks created by the user
                const tasks = await Task.find({ createdBy: req.user._id });
                const taskIds = tasks.map((task) => task._id);

                // Comments associated with these tasks
                comments = await Comment.find({ task: { $in: taskIds } })
                    .populate("task", "title")
                    .populate("commentby", "firstName lastName email role");
                break;

            case "Admin":
                // Fetch all comments
                comments = await Comment.find()
                    .populate("task", "title")
                    .populate("commentby", "firstName lastName email role");
                break;

            default:
                return res.status(403).json({ message: "Unauthorized role" });
        }

        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found." });
        }

        return res.status(200).json({ data: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
};
export const getComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        // Validate commentId
        if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
            return handleErrorResponse(res, 400, "Invalid or missing Comment ID.");
        }

        // Fetch the comment by ID
        const comment = await Comment.findById(commentId)
            .populate("task", "title")
            .populate("commentby", "firstName lastName email role");

        if (!comment) {
            return handleErrorResponse(res, 404, "Comment not found.");
        }

        // Return successful response
        return handleSuccessResponse(res, 200, comment, "Comment fetched successfully.");
    } catch (error) {
        console.error("Error fetching comment:", error);
        return handleErrorResponse(res, 500, "Internal Server Error.");
    }
};
export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { content, task } = req.body;

    try {
        // Validate the commentId
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return handleErrorResponse(res, 400, "Invalid or missing Comment ID.");
        }

        // Ensure content and task are provided in the body
        if (!content || !task) {
            return handleErrorResponse(res, 400, "Content and Task are required.");
        }

        // Check if the comment exists
        const commentExists = await Comment.findById(commentId);
        if (!commentExists) {
            return handleErrorResponse(res, 404, "Comment not found.");
        }

        // Update the comment
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            {
                $set: {
                    content,
                    task,
                },
            },
            { new: true }
        );

        // If update failed
        if (!updatedComment) {
            return handleErrorResponse(res, 400, "Failed to update the comment.");
        }

        // Return success response with updated comment data
        return handleSuccessResponse(res, 200, updatedComment, "Comment updated successfully.");
    } catch (error) {
        // Log the error for debugging
        console.error("Error updating comment:", error);
        return handleErrorResponse(res, 500, "Internal Server Error.");
    }
};
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        // Validate the commentId
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return handleErrorResponse(res, 400, "Invalid Comment ID.");
        }

        // Check if the comment exists
        const commentExists = await Comment.findById(commentId);
        if (!commentExists) {
            return handleErrorResponse(res, 404, "Comment not found.");
        }

        // Delete the comment
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return handleErrorResponse(res, 400, "Failed to delete the comment.");
        }

        return handleSuccessResponse(res, 200, null, "Comment deleted successfully.");
    } catch (error) {
        console.error("Error deleting comment:", error);
        return handleErrorResponse(res, 500, "Internal Server Error.");
    }
};
export const createReply = async (req, res) => {
    const { reply, comment } = req.body;

    try {
        // Validate inputs
        if (![reply, comment].every((field) => field?.trim())) {
            return handleErrorResponse(res, 400, "Reply and Comment are required.");
        }

        // Check if the comment exists
        const commentExists = await Comment.findById(comment);
        if (!commentExists) {
            return handleErrorResponse(res, 404, "Comment not found.");
        }

        // Check if the user exists
        const replyByExists = await User.findById(req.user._id);
        if (!replyByExists) {
            return handleErrorResponse(res, 404, "User not found.");
        }

        // Construct the reply object
        const replyComment = {
            reply,
            replyBy: {
                _id: replyByExists._id,
                firstName: replyByExists.firstName,
                lastName: replyByExists.lastName,
                email: replyByExists.email,
                role: replyByExists.role,
            },
        };

        // Ensure the comment has a replies array, and push the new reply
        commentExists.replies = commentExists.replies || [];
        commentExists.replies.push(replyComment);

        // Save the updated comment
        await commentExists.save();

        return handleSuccessResponse(res, 200, commentExists, "Reply created successfully.");
    } catch (error) {
        console.error("Error creating reply:", error);
        return handleErrorResponse(res, 500, "Internal Server Error.");
    }
}; 