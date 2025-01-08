import { PendingTask } from "../models/pendingTask.model.js";
import { Task } from "../models/task.model.js";
import { handleErrorResponse, handleSuccessResponse } from "../utils/responseHandler.js"; // Assuming these utility functions exist

// Get all pending tasks for the current user
export const getAllPendingTask = async (req, res) => {
  try {
    // Ensure the user is authenticated and has the required ID in the request (for example, `req.user._id`).
    if (!req.user || !req.user._id) {
      return handleErrorResponse(res, 400, "User ID is missing or invalid.");
    }

    // Find tasks assigned to the current user
    const tasks = await Task.find({ assignedTo: req.user._id }).select("_id");

    if (!tasks || tasks.length === 0) {
      return handleErrorResponse(res, 404, "No tasks found for this user.");
    }

    const taskIds = tasks.map((task) => task._id);

    // Find pending tasks related to the user's tasks
    const pendingTasks = await PendingTask.find({ task: { $in: taskIds } })
      .populate("task", "title description status assignedTo dueTime project")
      .select("-__v"); // Exclude version field for cleaner responses

    if (!pendingTasks || pendingTasks.length === 0) {
      return handleErrorResponse(res, 404, "No pending tasks found for this user.");
    }

    return handleSuccessResponse(res, 200, pendingTasks, "Pending tasks retrieved successfully.");
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
    return handleErrorResponse(res, 500, "An error occurred while fetching pending tasks.");
  }
};

