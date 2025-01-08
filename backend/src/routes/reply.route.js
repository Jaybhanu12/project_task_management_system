import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { addReplyToComment } from "../controllers/reply.controller.js";

// Create a new instance of the Router
const router = Router();

/**
 * @route POST /comments/reply
 * @desc Add a reply to a comment
 * @access Private (requires JWT verification)
 */
router.route("/comments/reply").post(verifyJwt, addReplyToComment);

/**
 * @route POST /comments/sub-reply
 * @desc Add a sub-reply to a comment (uncomment this if needed)
 * @access Private (requires JWT verification)
 */
// router.route("/comments/sub-reply").post(verifyJwt, addSubReplyToComment);

export default router;
