import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getAllPendingTask } from "../controllers/pendingTask.controller.js";

// Create a new instance of the Router
const router = Router();

/**
 * @route GET /tasks/pending
 * @desc Get all pending tasks
 * @access Private (requires JWT verification)
 */
router.route("/tasks/pending").get(verifyJwt, getAllPendingTask);

export default router;
