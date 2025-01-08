import { Router } from "express";
import { 
  completedToggle, 
  createTask, 
  deleteTask, 
  getTodaysTask, 
  getTask, 
  startToggle, 
  updateTask, 
  getAllTask 
} from "../controllers/task.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

// Create a new instance of the Router
const router = Router();

/**
 * @route POST /tasks
 * @desc Create a new task
 * @access Private (requires JWT verification)
 */
router.route("/tasks").post(verifyJwt, createTask);

/**
 * @route GET /tasks/today
 * @desc Get today's tasks
 * @access Private (requires JWT verification)
 */
router.route("/tasks/today").get(verifyJwt, getTodaysTask);

/**
 * @route GET /tasks/:taskId
 * @desc Get task by ID
 * @access Private (requires JWT verification)
 */
router.route("/tasks/:taskId").get(verifyJwt, getTask);

/**
 * @route GET /tasks
 * @desc Get all tasks
 * @access Private (requires JWT verification)
 */
router.route("/tasks").get(verifyJwt, getAllTask);

/**
 * @route PATCH /tasks/:taskId
 * @desc Update task by ID
 * @access Private (requires JWT verification)
 */
router.route("/tasks/:taskId").patch(verifyJwt, updateTask);

/**
 * @route DELETE /tasks/:taskId
 * @desc Delete task by ID
 * @access Private (requires JWT verification)
 */
router.route("/tasks/:taskId").delete(verifyJwt, deleteTask);

/**
 * @route GET /tasks/:taskId/completed
 * @desc Toggle task completion status
 * @access Private (requires JWT verification)
 */
router.route("/tasks/:taskId/completed").get(verifyJwt, completedToggle);

/**
 * @route GET /tasks/:taskId/start
 * @desc Toggle task start status
 * @access Private (requires JWT verification)
 */
router.route("/tasks/:taskId/start").get(verifyJwt, startToggle);

export default router;
