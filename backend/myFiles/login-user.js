// myFiles/login-user.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../myschema/UserSchema.js";

const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 * - Validates input
 * - Compares with DB
 * - Generates JWT
 * - Responds with { token, user } for client to save token in LocalStorage and redirect to Dashboard
 */
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Server-side validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Valid email is required" });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email and password combination" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect email and password combination" });
    }

    // Create token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });

    // Prepare user data for dashboard (exclude password)
    const safeUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt
    };

    // Send token and data
    return res.json({
      message: "Login successful",
      token,
      user: safeUser,
      redirectTo: "/dashboard"
    });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ error: "Server error during login" });
  }
});

export default router;
