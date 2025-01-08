import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator"; // To help with email validation and other checks

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name must be at most 50 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    role: {
      type: String,
      enum: ["Admin", "Project Manager", "Team Member"],
      default: "Team Member",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password should be at least 8 characters long"],
      select: false, // To prevent sending password in API responses unless explicitly requested
    },
    refreshToken: {
      type: String,
      select: false, // We don't want to send refresh token in API responses by default
    },
  },
  {
    timestamps: true,
  }
);

// Indexing email field for faster lookup
userSchema.index({ email: 1 });

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash password if it's modified

  try {
    // Salt rounds should be higher in production (10 is typical)
    const salt = await bcrypt.genSalt(12); 
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare the given password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Method to generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email, // Include more info if necessary (but avoid adding sensitive data like password)
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

// Method to generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};

// Static method to find a user by email (useful for login or authentication)
userSchema.statics.findByEmail = async function (email) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  return user;
};

// To prevent sending sensitive data like password and refreshToken on API responses
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;  // Remove password field
  delete userObject.refreshToken; // Remove refresh token field
  return userObject;
};

export const User = mongoose.model("User", userSchema);
