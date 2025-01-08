import mongoose from "mongoose";
import { Schema } from "mongoose";

// Reply Comment Schema with validation
const replyCommentSchema = new Schema(
  {
    reply: {
      type: String,
      required: [true, "Reply content is required"],  // Improved error messaging
      trim: true,  // Trim white spaces
    },
    replyBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User",  // Ensure this references the User model
      required: true,  // Ensure replyBy is always provided
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",  // Ensure this references the Comment model
      required: true,  // Ensure the comment being replied to exists
    },
  },
  { timestamps: true }
);

// Main Comment Schema with replies
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],  // Improved error messaging
      trim: true,  // Trim white spaces
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",  // Ensure this references the Task model
      required: true,  // Ensure each comment is related to a task
    },
    commentby: {
      type: Schema.Types.ObjectId,
      ref: "User",  // Ensure this references the User model
      required: true,  // Ensure a user is always linked to the comment
    },
    replies: [replyCommentSchema],  // Embedding the reply schema for replies
  },
  { timestamps: true }
);

// Creating the Comment Model
const Comment = mongoose.model("Comment", commentSchema);

// Exporting the Comment Model for use in other parts of the application
export { Comment };
