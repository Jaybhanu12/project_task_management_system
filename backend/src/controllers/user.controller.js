
import { Comment } from "../models/comment.model.js";
import { Project } from "../models/project.model.js";
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

// Generate Access and Refresh Tokens
const generateAccessAndRefreshToken = async (userId) => {
    try {
        // Validate user ID
        if (!userId) {
            throw new Error("User ID is required.");
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found.");
        }

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Update user document with the new refresh token
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Return the tokens
        return { accessToken, refreshToken };
    } catch (error) {
        // Handle errors gracefully
        console.error("Error generating tokens:", error.message);
        throw new Error("Failed to generate tokens. Please try again.");
    }
};

// Create a New User admin only
export const createUser = AsyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Validate if the requester has admin privileges
        if (req.user?.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Only admins can create users." });
        }

        // Check for missing or empty fields
        if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields (firstName, lastName, email, password) are required." });
        }

        // Validate role
        const validRoles = ["Admin", "Project Manager", "Team Member"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role. Valid roles are: ${validRoles.join(", ")}` });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use. Please use a different email." });
        }

        // Create the user
        const user = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password,
            role,
        });

        if (!user) {
            return res.status(500).json({ message: "Failed to create user. Please try again." });
        }

        // Remove sensitive information before sending response
        const sanitizedUser = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        return res.status(201).json({ data: sanitizedUser, message: "User created successfully." });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Signup a New User as Admin directly if new team want to manage there tsk!! and  there admin cann make
export const signupUser = AsyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // // Validate if the requester has admin privileges
        // if (req.user?.role !== "Admin") {
        //     return res.status(403).json({ message: "Access denied. Only admins can create users." });
        // }

        // Check for missing or empty fields
        if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields (firstName, lastName, email, password) are required." });
        }

        // Validate role
        // const validRoles = ["Admin", "Project Manager", "Team Member"];
        // if (!validRoles.includes(role)) {
        //     return res.status(400).json({ message: `Invalid role. Valid roles are: ${validRoles.join(", ")}` });
        // }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use. Please use a different email." });
        }

        // Create the user
        const user = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password,
            role: "Admin",
        });

        if (!user) {
            return res.status(500).json({ message: "Failed to signup. Please try again." });
        }

        // Remove sensitive information before sending response
        const sanitizedUser = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };

        return res.status(201).json({ data: sanitizedUser, message: "Signup successfully." });
    } catch (error) {
        console.error("Error SigningUp:", error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// Get All Users (Admin Only)
export const getAllUser = AsyncHandler(async (req, res) => {
    try {
        // Ensure only admins can access this route
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Fetch all users excluding sensitive information
        const users = await User.find().select("-password -refreshToken").lean();

        // Handle case where no users are found
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        // Return the list of users
        return res.status(200).json({ data: users, message: "Users retrieved successfully" });
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get a Specific User (Admin Only)
export const getUser = AsyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        // Check if the user has the 'Admin' role for access control
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Validate userId parameter
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Retrieve user from the database
        const user = await User.findById(userId).select("-password -refreshToken");

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user data
        return res.status(200).json({ data: user, message: "User retrieved successfully" });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//Admin
export const updateUser = AsyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, email, role } = req.body;

    try {
        // Check if the logged-in user has admin privileges
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Only admins can update users." });
        }

        // Validate the userId parameter
        if (!userId) {
            return res.status(400).json({ message: "Invalid User ID." });
        }

        // Check if the user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate the role if provided
        const validRoles = ["Admin", "Project Manager", "Team Member"];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: `Invalid role. Valid roles are: ${validRoles.join(", ")}.` });
        }

        // Update the user fields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: { firstName, lastName, email, role },
            },
            { new: true, runValidators: true } // Ensures updated data adheres to schema validations
        );

        // Check if the update was successful
        if (!updatedUser) {
            return res.status(500).json({ message: "An error occurred while updating the user." });
        }

        // Return the updated user data
        return res.status(200).json({ data: updatedUser, message: "User updated successfully." });
    } catch (error) {
        // Handle unexpected errors gracefully
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// Delete a User (Admin Only)
export const deleteUser = AsyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        // Authorization check: Ensure the requester is an Admin
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "You are not authorized to delete a user" });
        }

        // Validate userId: Ensure it's provided
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Check if the user exists
        const existsUser = await User.findById(userId);
        if (!existsUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(500).json({ message: "Something went wrong while deleting the user" });
        }

        // Respond with a success message
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate input fields
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Find user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate role
        if (role !== user.role) {
            return res.status(403).json({ message: "Invalid role." });
        }

        // Validate password
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        // Fetch logged-in user data (excluding sensitive fields)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Set secure cookies for tokens
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development", // Only secure in development
            sameSite: "strict", // Prevent CSRF
        };

        res
            .status(200)
            .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }) // Access token expires in 15 minutes
            .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }) // Refresh token expires in 7 days
            .json({
                user: {
                    id: loggedInUser._id,
                    firstName: loggedInUser.firstName,
                    lastName: loggedInUser.lastName,
                    email: loggedInUser.email,
                    role: loggedInUser.role,
                    accessToken,
                    refreshToken,
                },
                message: "Login successful.",
            });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

// User Logout
export const logoutUser = AsyncHandler(async (req, res) => {
    try {
        // Validate user presence in the request
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: "User information is missing. Logout failed." });
        }

        // Clear the refresh token for the user
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: null } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found. Logout failed." });
        }

        // Options for clearing cookies securely
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development", // Only secure in production
            sameSite: "strict", // Prevent CSRF
        };

        // Clear cookies and send a success response
        res
            .status(200)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json({ message: "User logout successful." });
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ message: "Internal server error during logout." });
    }
});

export const getCurrentUser = AsyncHandler(async (req, res) => {
    try {
        // Fetch user details
        const userExists = await User.findById(req.user._id).select("-password -refreshToken");
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch tasks, projects, and comments concurrently
        const [userTasks, userProjects, userComments] = await Promise.all([
            Task.find({ assignedTo: req.user._id }).lean(),
            Project.find({ teamMembers: req.user._id }).lean(),
            Comment.find({ commentBy: req.user._id }).lean(),
        ]);

        // Prepare user data summary
        const userSummary = {
            id: userExists._id,
            firstName: userExists.firstName,
            lastName: userExists.lastName,
            role: userExists.role,
            email: userExists.email,
            phone: userExists.phone || "N/A",
            taskCount: userTasks.length,
            projectCount: userProjects.length,
            commentsCount: userComments.length,
        };

        // Respond with user data
        return res.status(200).json({
            data: userSummary,
            message: "User data retrieved successfully",
        });
    } catch (error) {
        console.error("Error fetching current user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update User Profile
export const updateUserProfile = AsyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, email } = req.body;

    try {
        // Validate input: ensure the user ID is provided
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Validate fields to update: ensure they are provided and non-empty
        if ([firstName, lastName, email].some((field) => !field?.trim())) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Fetch the user from the database
        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the email is already in use by another user
        if (email && email !== existingUser.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        // Update the user with the new data
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).json({ message: "Error while updating user" });
        }

        // Return the updated user data
        return res.status(200).json({
            data: updatedUser,
            message: "User profile updated successfully",
        });

    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Admin Overview
export const adminOverview = AsyncHandler(async (req, res) => {
    try {
        // Authorization check: Ensure the requester is an Admin
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "You are not authorized to access this API" });
        }

        // Fetch counts for Users, Tasks, and Projects
        const [userCount, taskCount, projectCount] = await Promise.all([
            User.countDocuments(), // Efficient way to get count of users
            Task.countDocuments(), // Efficient way to get count of tasks
            Project.countDocuments() // Efficient way to get count of projects
        ]);

        // Structure the response data
        const data = {
            userCount,
            taskCount,
            projectCount
        };

        // Return the result
        return res.status(200).json({ data });

    } catch (error) {
        // Log error for debugging (optional)
        console.error("Error in adminOverview:", error);

        // Return a server error message
        return res.status(500).json({ message: "Internal server error" });
    }
});
