import { Comment } from "../models/comment.model.js";
import { ReplyComment } from "../models/reply.model.js";
import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

// Add a Reply to a Comment
export const addReplyToComment = AsyncHandler(async (req, res) => {
  const { reply, comment } = req.body;

  // Check if fields are empty
  if ([reply, comment].some((field) => !field.trim())) {
    return res.status(400).json({ message: "Fields cannot be empty" });
  }

  // Check if the user exists
  const userExists = await User.findById(req.user._id);
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the comment exists
  const commentExists = await Comment.findById(comment);
  if (!commentExists) {
    return res.status(404).json({ message: "Comment not found" });
  }

  // Create a new reply
  const replyComment = await ReplyComment.create({
    reply,
    replyBy: userExists._id,
    comment: commentExists._id,
  });

  if (!replyComment) {
    return res.status(500).json({ message: "Something went wrong while adding the reply" });
  }

  return res.status(200).json({ data: replyComment, message: "Reply added successfully" });
});

// Get All Replies to a Comment
export const getAllReplyComments = AsyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;

    // Check if the comment exists
    const commentExists = await Comment.findById(commentId);
    if (!commentExists) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Get all replies for the comment
    const replies = await ReplyComment.find({ comment: commentId })
      .populate("replyBy", "firstName lastName email") // Populate user details
      .populate("comment", "title description");

    return res.status(200).json({ data: replies });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong while fetching replies", error: error.message });
  }
});


//model code



// import mongoose from 'mongoose';

// const replyCommentSchema = new mongoose.Schema({
//   reply: {
//     type: String,
//     required: true,
//   },
//   replyBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   comment: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment',
//     required: true,
//   },
//   parentReply: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ReplyComment',
//     default: null,
//   },
// }, { timestamps: true });

// const ReplyComment = mongoose.model('ReplyComment', replyCommentSchema);

// export { ReplyComment };
