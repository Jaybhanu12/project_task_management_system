import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";
import { PendingTask } from "../models/pendingTask.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { CompletedTask } from "../models/completedTask.model.js";

// Admin & Project Manager: Create a task
export const createTask = async (req, res) => {
    const {
        title,
        description,
        status,
        assignedTo,
        assignedDate,
        project,
        dueTime,
    } = req.body;

    // Role validation
    if (!["Admin", "Project Manager"].includes(req.user.role)) {
        return res.status(400).json({ message: "You do not have permission to create a task." });
    }

    // Validate input fields
    if ([title, description, status, assignedTo, assignedDate, project, dueTime].some(field => !field.trim())) {
        return res.status(400).json({ message: "All fields must be provided." });
    }

    // Check if task already exists
    const taskExists = await Task.findOne({ title });
    if (taskExists) {
        return res.status(400).json({ message: "Task already exists." });
    }

    // Validate user and project existence
    const assignedToExists = await User.findById(assignedTo);
    if (!assignedToExists) {
        return res.status(400).json({ message: "Assigned user is invalid." });
    }

    const projectIdExists = await Project.findById(project);
    if (!projectIdExists) {
        return res.status(400).json({ message: "Project is invalid." });
    }

    // Format assignedDate
    const date = new Date(assignedDate).toLocaleDateString();

    // Create the task
    const task = await Task.create({
        title,
        description,
        status,
        assignedTo: assignedToExists._id,
        assignedDate: date,
        project: projectIdExists._id,
        createdBy: req.user._id,
        dueTime,
    });

    if (!task) {
        return res.status(500).json({ message: "Something went wrong while creating the task." });
    }

    return res.status(200).json({ data: task, message: "Task created successfully." });
};

// Get Today's Tasks for a User
export const getTodaysTask = AsyncHandler(async (req, res) => {
    const date = new Date().toLocaleDateString();

    // Fetch tasks for today
    const tasks = await Task.find({
        assignedTo: req.user._id,
        assignedDate: date,
    }).populate("project", "title description startDate endDate");

    if (!tasks.length) {
        return res.status(400).json({ message: "No tasks found for today." });
    }

    // Check for tasks that are pending or in progress
    await Promise.all(tasks.map(async (task) => {
        if (task.status === "N/A" || task.status === "In Progress") {
            const taskExist = await PendingTask.findOne({ task: task._id });
            if (!taskExist) {
                await PendingTask.create({ task: task._id });
            }
        }
    }));

    return res.status(200).json({ data: tasks });
});

// Admin: Get All Tasks
export const getAllTask = AsyncHandler(async (req, res) => {
    if (req.user.role !== "Admin") {
        return res.status(400).json({ message: "You do not have permission to view all tasks." });
    }

    const tasks = await Task.find()
        .populate("assignedTo", "firstName lastName email")
        .populate("project", "title description startDate endDate")
        .populate("createdBy", "firstName lastName email");

    if (!tasks.length) {
        return res.status(400).json({ message: "No tasks found." });
    }

    return res.status(200).json({ data: tasks });
});

// Get a Specific Task by ID
export const getTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId)
            .populate("assignedTo", "firstName lastName email")
            .populate("project", "title description startDate endDate");

        if (!task) {
            return res.status(400).json({ message: "Task not found." });
        }

        return res.status(200).json({ data: task });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching task.", error: error.message });
    }
};

// Admin: Update a Task
export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, assignedTo, assignedDate, project, dueTime, status } = req.body;

    // Role validation
    if (!["Admin", "Project Manager"].includes(req.user.role)) {
        return res.status(400).json({ message: "You do not have permission to update the task." });
    }

    // Validate task ID
    if (!taskId) {
        return res.status(400).json({ message: "Task ID is required." });
    }

    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(400).json({ message: "Task not found." });
    }

    // Validate user and project existence
    const assignedToExists = await User.findById(assignedTo);
    if (!assignedToExists) {
        return res.status(400).json({ message: "Assigned user is invalid." });
    }

    const projectExists = await Project.findById(project);
    if (!projectExists) {
        return res.status(400).json({ message: "Project is invalid." });
    }

    // Update the task
    task.title = title || task.title;
    task.description = description || task.description;
    task.assignedTo = assignedTo || task.assignedTo;
    task.assignedDate = assignedDate || task.assignedDate;
    task.project = project || task.project;
    task.dueTime = dueTime || task.dueTime;
    task.status = status || task.status;

    await task.save();

    return res.status(200).json({ data: task, message: "Task updated successfully." });
};

// Delete a Task
export const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(400).json({ message: "Task not found." });
        }

        await task.remove();
        return res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting task.", error: error.message });
    }
};

// Mark Task as Completed
export const completedToggle = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(400).json({ message: "Task not found." });
        }

        task.status = "Completed";
        await task.save();

        const completedTask = await CompletedTask.create({
            task: task._id,
            completedBy: req.user._id,
            completedDate: new Date(),
        });

        return res.status(200).json({ message: "Task marked as completed.", data: completedTask });
    } catch (error) {
        return res.status(500).json({ message: "Error marking task as completed.", error: error.message });
    }
};

// Start Task
export const startToggle = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(400).json({ message: "Task not found." });
        }

        task.status = "In Progress";
        await task.save();

        return res.status(200).json({ message: "Task marked as in progress." });
    } catch (error) {
        return res.status(500).json({ message: "Error starting task.", error: error.message });
    }
};
