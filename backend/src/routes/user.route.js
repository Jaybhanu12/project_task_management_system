import { Router } from "express";
import {
  adminOverview,
  createUser,
  deleteUser,
  getAllUser,
  getCurrentUser,
  getUser,
  signupUser,
  loginUser,
  logoutUser,
  updateUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @route POST /loginUser
 * @desc Log in a user
 * @access Public
 */
router.route("/loginUser").post(loginUser);

/**
 * @route POST /signupUser
 * @desc signup a user
 * @access Public
 */
router.route("/signupUser").post(signupUser);

/**
 * @route POST /logoutUser
 * @desc Log out the current user
 * @access Private (JWT verification required)
 */
router.route("/logoutUser").post(verifyJwt, logoutUser);

/**
 * @route POST /createUser
 * @desc Create a new user
 * @access Private (Admin access required)
 */
router.route("/createUser").post(verifyJwt, createUser);

/**
 * @route GET /getAllUser
 * @desc Get all users
 * @access Private (Admin access required)
 */
router.route("/getAllUser").get(verifyJwt, getAllUser);

/**
 * @route GET /getCurrentUser
 * @desc Get the currently authenticated user
 * @access Private (JWT verification required)
 */
router.route("/getCurrentUser").get(verifyJwt, getCurrentUser);

/**
 * @route GET /getUser/:userId
 * @desc Get a specific user by ID
 * @access Private (JWT verification required)
 */
router.route("/getUser/:userId").get(verifyJwt, getUser);

/**
 * @route GET /adminOverview
 * @desc Get an overview of the admin dashboard
 * @access Private (Admin access required)
 */
router.route("/adminOverview").get(verifyJwt, adminOverview);

/**
 * @route PATCH /updateUser/:userId
 * @desc Update user details by ID
 * @access Private (JWT verification required)
 */
router.route("/updateUser/:userId").patch(verifyJwt, updateUser);

/**
 * @route PATCH /updateUserProfile/:userId
 * @desc Update the profile details of a user by ID
 * @access Private (JWT verification required)
 */
router.route("/updateUserProfile/:userId").patch(verifyJwt, updateUserProfile);

/**
 * @route DELETE /deleteUser/:userId
 * @desc Delete a user by ID
 * @access Private (Admin access required)
 */
router.route("/deleteUser/:userId").delete(verifyJwt, deleteUser);

export default router;
