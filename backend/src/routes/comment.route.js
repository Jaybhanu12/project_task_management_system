import { Router } from "express";
import {
  createComment,
  createReply,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

// Create a new instance of the Router
const router = Router();

/**
 * @route POST /createComment
 * @desc Create a new comment
 * @access Private (requires JWT verification)
 */
router.route("/createComment").post(verifyJwt, createComment);

/**
 * @route GET /getAllComments
 * @desc Get all comments
 * @access Private (requires JWT verification)
 */
router.route("/getAllComments").get(verifyJwt, getAllComments);

/**
 * @route GET /getComment/:commentId
 * @desc Get a specific comment by ID
 * @access Private (requires JWT verification)
 */
router.route("/getComment/:commentId").get(verifyJwt, getComment);

/**
 * @route PATCH /updateComment/:commentId
 * @desc Update a specific comment
 * @access Private (requires JWT verification)
 */
router.route("/updateComment/:commentId").patch(verifyJwt, updateComment);

/**
 * @route DELETE /deleteComment/:commentId
 * @desc Delete a specific comment
 * @access Private (requires JWT verification)
 */
router.route("/deleteComment/:commentId").delete(verifyJwt, deleteComment);

/**
 * @route POST /createReply
 * @desc Create a reply to a comment
 * @access Private (requires JWT verification)
 */
router.route("/createReply").post(verifyJwt, createReply);

// Future routes for adding comments to replies (uncomment if needed)
 // router.route("/addCommentToReply").post(verifyJwt, addCommentToReply);
 // router.route("/reply/:replyId/comment").post(verifyJwt, addCommentToReply);
 // router.route("/reply/:replyId/sub-reply/:subReplyId").post(verifyJwt, addCommentToReply);

export default router;
