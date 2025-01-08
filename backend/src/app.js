import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Environment Configuration
dotenv.config({ path: "./.env" });

// Create Express App
const app = express();

// Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Set origin from environment variable or default to '*'
  credentials: true,
}));

// Router Setup
import userRoute from "./routes/user.route.js";
import projectRoute from "./routes/project.route.js";
import taskRoute from "./routes/task.route.js";
import commentRoute from "./routes/comment.route.js";
import pendingTaskRoute from "./routes/pendingTask.route.js";
import completedTaskRoute from "./routes/completedTask.route.js";
import replyRoute from "./routes/reply.route.js";
 
app.use("/api/v1/users", userRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/pendingTask", pendingTaskRoute);
app.use("/api/v1/completedTask", completedTaskRoute);
app.use("/api/v1/replys", replyRoute);

// Database Connection & Server Start
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is working on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Exit process with failure
  });

export { app };
