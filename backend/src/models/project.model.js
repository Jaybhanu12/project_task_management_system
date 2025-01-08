import mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "./user.model.js"; // Assuming user model is in the same directory

// Schema for the Project
const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    startDate: {
      type: Date, // Ensuring this is a Date object
      required: [true, "Project start date is required"],
      validate: {
        validator: function (v) {
          return v instanceof Date;
        },
        message: "Start date must be a valid date",
      },
    },
    endDate: {
      type: Date, // Ensuring this is a Date object
      required: [true, "Project end date is required"],
      validate: {
        validator: function (v) {
          return v instanceof Date;
        },
        message: "End date must be a valid date",
      },
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'On Hold', 'N/A'],
      default: 'N/A',
    },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project manager is required"],
      validate: {
        validator: async function (v) {
          const user = await User.findById(v);
          return user && ['Admin', 'Project Manager'].includes(user.role);
        },
        message: (props) => `${props.value} must be an Admin or Project Manager`,
      },
    },
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Adding index for efficient queries
projectSchema.index({ status: 1 });
projectSchema.index({ projectManager: 1 });
projectSchema.index({ startDate: 1 });

// Virtuals can be used to populate specific fields automatically when queried
projectSchema.virtual("teamMembersDetails", {
  ref: "User", // Model to populate from
  localField: "teamMembers", // Field on the project to match
  foreignField: "_id", // Field on the user model to match
  justOne: false, // since teamMembers is an array
});

// Middleware to ensure the correct data structure before saving
projectSchema.pre("save", function (next) {
  // Ensure endDate is greater than startDate
  if (this.endDate < this.startDate) {
    next(new Error("End date must be later than start date"));
  } else {
    next();
  }
});

// Create the Project model
const Project = mongoose.model("Project", projectSchema);

export { Project };
