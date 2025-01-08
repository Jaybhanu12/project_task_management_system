import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the schema for completed tasks
const completedTaskSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task", // Referencing the "Task" model
      required: [true, "Task is required"],  // Ensure that a task is always associated with a completed task
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Creating an index on 'task' field for faster lookups when querying completed tasks by task ID
completedTaskSchema.index({ task: 1 });

// Creating the model for completed tasks
const CompletedTask = mongoose.model("CompletedTask", completedTaskSchema);

export { CompletedTask };
