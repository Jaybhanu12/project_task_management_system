import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

// Enhanced JWT verification middleware
const verifyJwt = AsyncHandler(async (req, res, next) => {
  try {
    // Retrieve token from cookies or Authorization header
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // If no token is found, return unauthorized status
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // If the token is invalid or expired, handle the error gracefully
    if (!decodedToken || !decodedToken._id) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    // Fetch the user associated with the decoded token's userId
    const user = await User.findById(decodedToken._id);

    // If the user is not found, return an error
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Attach the user to the request object to use in subsequent middleware or routes
    req.user = user;
    next();
    
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error("JWT verification error:", error);

    // Return appropriate error message based on the exception
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token has expired" });
    }

    return res.status(400).json({ message: error?.message || "Unauthorized request" });
  }
});

// Enhanced Basic Authentication middleware
async function basicAuth(req, reply) {
  const authHeader = req.headers["authorization"];

  // If no authorization header is found, return an error
  if (!authHeader) {
    return reply.status(400).send({ message: "Unauthorized: No authorization header provided" });
  }

  const [authType, authKey] = authHeader.split(" ");

  // Ensure that the authorization type is "Basic"
  if (authType !== "Basic") {
    return reply.status(401).send({ error: "Unauthorized: Requires Basic Auth" });
  }

  // Decode the base64-encoded credentials
  const [email, password] = Buffer.from(authKey, "base64").toString("ascii").split(":");

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    // If the user does not exist, return an error
    if (!user) {
      return reply.status(401).send({ error: "Unauthorized: User not found" });
    }

    // Validate the password
    const isPasswordValid = await user.comparePassword(password);

    // If the password is incorrect, return an error
    if (!isPasswordValid) {
      return reply.status(401).send({ error: "Unauthorized: Invalid password" });
    }

    // Proceed if the user is authenticated (Optional: Log success)
    console.log(`User ${email} successfully authenticated via Basic Auth`);
  } catch (error) {
    // Log the error for debugging purposes (optional)
    console.error("Basic Authentication error:", error);

    // Return an error response for internal issues
    return reply.status(500).send({ error: "Internal server error during authentication" });
  }
}

export { verifyJwt, basicAuth };
