import mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "./user.model.js"; // Assuming the User model is available

// Schema for the ReplyComment
const replyCommentSchema = new Schema(
  {
    reply: {
      type: String,
      required: [true, "Reply is required"],
      trim: true,
      minlength: [1, "Reply cannot be empty"],
    },
    replyBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "ReplyBy user is required"],
      validate: {
        validator: async function (v) {
          const user = await User.findById(v);
          return user !== null; // Ensure the user exists
        },
        message: "User does not exist",
      },
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: [true, "Comment reference is required"], // Make sure the comment is required
    },
    replyId: {
      type: Schema.Types.ObjectId,
      ref: "ReplyComment",
      default: null, // This could be null if there's no reply to another reply
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// Adding indexes for frequently queried fields to optimize performance
replyCommentSchema.index({ comment: 1 });
replyCommentSchema.index({ replyBy: 1 });
replyCommentSchema.index({ replyId: 1 });

// Virtual population: Automatically populate `comment` and `replyBy` when queried
replyCommentSchema.virtual("commentDetails", {
  ref: "Comment", // Reference to the Comment model
  localField: "comment", // Field in ReplyComment that refers to Comment
  foreignField: "_id", // Foreign field in the Comment model
  justOne: true, // Only one comment per reply
});

replyCommentSchema.virtual("userDetails", {
  ref: "User", // Reference to the User model
  localField: "replyBy", // Field in ReplyComment that refers to User
  foreignField: "_id", // Foreign field in the User model
  justOne: true, // Only one user per reply
});

// Middleware to handle circular references (if required)
// Prevent saving a reply to a reply that would create a circular reference
replyCommentSchema.pre("save", function (next) {
  if (this.replyId && this.replyId.toString() === this._id.toString()) {
    return next(new Error("A reply cannot reply to itself"));
  }
  next();
});

// Create and export the ReplyComment model
const ReplyComment = mongoose.model("ReplyComment", replyCommentSchema);

export { ReplyComment };
