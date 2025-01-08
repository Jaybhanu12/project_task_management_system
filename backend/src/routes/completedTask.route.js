import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { getAllCompletedTask } from "../controllers/completedTask.controller.js";

// Create a new instance of the Router
const router = Router();

/**
 * @route GET /getAllCompletedTask
 * @desc Get all completed tasks
 * @access Private (requires JWT verification)
 */
router.route("/getAllCompletedTask").get(verifyJwt, getAllCompletedTask);

export default router;
