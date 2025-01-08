import mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "./user.model.js";  // Assuming User model exists
import { Project } from "./project.model.js"; // Assuming Project model exists

// Task Schema
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "On Hold", "N/A"],
      default: "N/A",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assigned user is required"],
      validate: {
        validator: async function (v) {
          const user = await User.findById(v);
          return user !== null;
        },
        message: "Assigned user does not exist",
      },
    },
    assignedDate: {
      type: Date,
      required: [true, "Assigned date is required"],
    },
    dueTime: {
      type: Date,
      required: [true, "Due time is required"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [false, "Project reference is optional"],
    },
    startTime: {
      type: Date,
      required: false,
    },
    endTime: {
      type: Date,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user is required"],
    },
    changesBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,  // Automatically tracks createdAt and updatedAt fields
  }
);

// Indexing fields to optimize query performance
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ project: 1 });
taskSchema.index({ createdBy: 1 });

// Virtual field to automatically populate assigned user and creator
taskSchema.virtual("assignedUserDetails", {
  ref: "User",
  localField: "assignedTo",
  foreignField: "_id",
  justOne: true,
});

taskSchema.virtual("creatorDetails", {
  ref: "User",
  localField: "createdBy",
  foreignField: "_id",
  justOne: true,
});

// Virtual for project details
taskSchema.virtual("projectDetails", {
  ref: "Project",
  localField: "project",
  foreignField: "_id",
  justOne: true,
});

// Pre-save validation or transformation, if needed (e.g. transforming date)
taskSchema.pre("save", function (next) {
  // Ensure dates are in Date format before saving
  if (this.assignedDate && typeof this.assignedDate === "string") {
    this.assignedDate = new Date(this.assignedDate);
  }
  if (this.dueTime && typeof this.dueTime === "string") {
    this.dueTime = new Date(this.dueTime);
  }
  if (this.startTime && typeof this.startTime === "string") {
    this.startTime = new Date(this.startTime);
  }
  if (this.endTime && typeof this.endTime === "string") {
    this.endTime = new Date(this.endTime);
  }

  next();
});

// Post-save hook, can be used for notifications or related operations
taskSchema.post("save", async function (doc, next) {
  // For example, sending notifications or updating related data after task is saved
  console.log(`Task "${doc.title}" has been created/updated successfully.`);
  next();
});

// Task Model
const Task = mongoose.model("Task", taskSchema);

export { Task };
