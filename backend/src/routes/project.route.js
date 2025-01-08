import { Router } from "express";
import { 
  createProject, 
  deleteProject, 
  getAllProjects, 
  getAllProjectsAdmin, 
  getProject, 
  updateProject 
} from "../controllers/project.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

// Create a new instance of the Router
const router = Router();

/**
 * @route POST /createProject
 * @desc Create a new project
 * @access Private (requires JWT verification)
 */
router.route("/createProject").post(verifyJwt, createProject);

/**
 * @route GET /projects
 * @desc Get all projects
 * @access Private (requires JWT verification)
 */
router.route("/getAllProjects").get(verifyJwt, getAllProjects);

/**
 * @route GET /projects/admin
 * @desc Get all projects for admin
 * @access Private (requires JWT verification)
 */
router.route("/getAllProjectsAdmin").get(verifyJwt, getAllProjectsAdmin);

/**
 * @route GET /projects/:projectId
 * @desc Get a specific project by ID
 * @access Private (requires JWT verification)
 */
router.route("/getProject/:projectId").get(verifyJwt, getProject);

/**
 * @route PATCH /projects/:projectId
 * @desc Update a project by ID
 * @access Private (requires JWT verification)
 */
router.route("/updateProject/:projectId").patch(verifyJwt, updateProject);

/**
 * @route DELETE /projects/:projectId
 * @desc Delete a project by ID
 * @access Private (requires JWT verification)
 */
router.route("/deleteProject/:projectId").delete(verifyJwt, deleteProject);

export default router;
