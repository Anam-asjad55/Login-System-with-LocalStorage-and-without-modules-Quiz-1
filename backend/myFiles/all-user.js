// myFiles/all-user.js
import express from "express";
import User from "../myschema/UserSchema.js";

const router = express.Router();

/**
 * GET /api/users
 * - Returns all users (safe fields only)
 * - In production, protect this route (e.g., admin-only)
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    return res.json(users);
  } catch (e) {
    console.error("Get all users error:", e);
    return res.status(500).json({ error: "Server error while fetching users" });
  }
});

export default router;
