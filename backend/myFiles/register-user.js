// myFiles/register-user.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../myschema/UserSchema.js";

const router = express.Router();

/**
 * POST /api/auth/register
 * Body: { fullName, email, password }
 * - Validates input
 * - Checks duplicate email
 * - Hashes password and saves user
 * - Responds with message and next step (redirect to login at client side)
 */
router.post("/", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Server-side validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return res.status(400).json({ error: "Full name must be at least 2 characters" });
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashed
    });

    // Do NOT send password back
    const safeUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt
    };

    // Client should redirect to Login page after success
    return res.status(201).json({
      message: "Registration successful. Please login.",
      user: safeUser,
      redirectTo: "/login"
    });
  } catch (e) {
    console.error("Register error:", e);
    return res.status(500).json({ error: "Server error during registration" });
  }
});

export default router;
