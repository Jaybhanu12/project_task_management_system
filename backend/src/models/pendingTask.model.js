import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the schema for pending tasks
const pendingTaskSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",  // Referencing the "Task" model
      required: [true, "Task is required"],  // Ensure the task field is required
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Creating an index on 'task' field for faster lookups when querying pending tasks by task ID
pendingTaskSchema.index({ task: 1 });

// Creating the model for pending tasks
const PendingTask = mongoose.model("PendingTask", pendingTaskSchema);

export { PendingTask };
