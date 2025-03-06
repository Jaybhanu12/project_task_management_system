import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

// Validation function for checking empty fields
const validateProjectFields = (fields) => {
    return fields.some((field) => !field || field.trim() === "");
};

// Admin: Create a new project
export const createProject = AsyncHandler(async (req, res) => {
    const { title, description, startDate, endDate, projectManager, teamMembers } = req.body;

    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Unauthorized: Only Admin can create projects." });
    }

    // Validate input fields
    // if (validateProjectFields([title, description, startDate, endDate, projectManager, teamMembers])) {
    //     return res.status(400).json({ message: "All fields are required." });
    // }

    // Check if project manager exists and is authorized
    const projectManagerExists = await User.findById(projectManager);
    if (!projectManagerExists || !["Admin", "Project Manager"].includes(projectManagerExists.role)) {
        return res.status(400).json({ message: "Invalid Project Manager." });
    }

    // Check if all team members exist
    for (let memberId of teamMembers) {
        const teamMember = await User.findById(memberId);
        if (!teamMember) {
            return res.status(400).json({ message: `Team Member with ID ${memberId} not found.` });
        }
    }

    const project = new Project({
        title,
        description,
        projectManager,
        teamMembers,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
    });

    await project.save();

    return res.status(201).json({ data: project, message: "Project created successfully." });
});

// Admin: Get all projects
export const getAllProjectsAdmin = AsyncHandler(async (req, res) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Unauthorized: Only Admin can view all projects." });
    }

    const projects = await Project.find()
        .populate("projectManager", "firstName lastName email")
        .populate("teamMembers", "firstName lastName email");

    return res.status(200).json({ data: projects });
});

// User: Get all projects assigned to or involving the user
export const getAllProjects = AsyncHandler(async (req, res) => {
    const projects = await Project.find({
        $or: [
            { projectManager: req.user._id },
            { teamMembers: req.user._id },
        ],
    })
        .populate("projectManager", "firstName lastName email")
        .populate("teamMembers", "firstName lastName email");

    return res.status(200).json({ data: projects });
});

// Get a specific project by ID
export const getProject = AsyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
        .populate("projectManager", "firstName lastName email")
        .populate("teamMembers", "firstName lastName email");

    if (!project) {
        return res.status(404).json({ message: "Project not found." });
    }

    return res.status(200).json({ data: project });
});

// Admin: Update an existing project
export const updateProject = AsyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { title, description, startDate, endDate, projectManager, teamMembers, status } = req.body;

    // if (req.user.role !== "Admin") {
    //     return res.status(403).json({ message: "Unauthorized: Only Admin can update projects." });
    // }

    const project = await Project.findById(projectId);
    if (!project) {
        return res.status(404).json({ message: "Project not found." });
    }

    // Check if project manager is valid
    if (projectManager) {
        const projectManagerExists = await User.findById(projectManager);
        if (!projectManagerExists || !["Admin", "Project Manager"].includes(projectManagerExists.role)) {
            return res.status(400).json({ message: "Invalid Project Manager." });
        }
    }

    // Check if team members are valid
    if (teamMembers) {
        for (let memberId of teamMembers) {
            const teamMember = await User.findById(memberId);
            if (!teamMember) {
                return res.status(400).json({ message: `Team Member with ID ${memberId} not found.` });
            }
        }
    }

    const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        {
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            projectManager,
            teamMembers,
            status,
        },
        { new: true }
    );

    return res.status(200).json({ data: updatedProject, message: "Project updated successfully." });
});

// Admin: Delete a project
export const deleteProject = AsyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Unauthorized: Only Admin can delete projects." });
    }
    if (!projectId) {
        return res.status(400).json({ message: "Project Id is Invalid" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
        return res.status(404).json({ message: "Project not found." });
    }

    const deleteProject = await Project.findByIdAndDelete(projectId);

    if (!deleteProject) {
      return res
        .status(400)
        .json({ message: "Something Went Wrong While Deleting Project" });
    }
    return res.status(200).json({ message: "Project deleted successfully." });
});

