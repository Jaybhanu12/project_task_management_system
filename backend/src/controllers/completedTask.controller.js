import { CompletedTask } from "../models/completedTask.model.js";
import { Task } from "../models/task.model.js";
import { handleErrorResponse, handleSuccessResponse } from "../utils/responseHandler.js"; // Assuming these utility functions exist

// Get all completed tasks for the current user
export const getAllCompletedTask = async (req, res) => {
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

    // Find completed tasks related to the user's tasks
    const completedTasks = await CompletedTask.find({ task: { $in: taskIds } })
      .populate("task", "title description status assignedTo dueTime project startTime endTime")
      .select("-__v"); // Exclude version field for cleaner responses

    if (!completedTasks || completedTasks.length === 0) {
      return handleErrorResponse(res, 404, "No completed tasks found for this user.");
    }

    return handleSuccessResponse(res, 200, completedTasks, "Completed tasks retrieved successfully.");
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    return handleErrorResponse(res, 500, "An error occurred while fetching completed tasks.");
  }
};