// myFiles/userdata.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../myschema/UserSchema.js";

const router = express.Router();

/**
 * Middleware: verify JWT in Authorization header: "Bearer <token>"
 */
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Authorization token missing" });
    }
    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/**
 * GET /api/auth/me
 * - Requires Bearer token
 * - Returns the logged-in user’s safe data
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({
      user,
      message: "Authorized"
    });
  } catch (e) {
    console.error("Get me error:", e);
    return res.status(500).json({ error: "Server error while fetching user data" });
  }
});

export default router;
