// index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";

// Routers
import registerRouter from "./myFiles/register-user.js";
import loginRouter from "./myFiles/login-user.js";
import allUsersRouter from "./myFiles/all-user.js";
import userDataRouter from "./myFiles/userdata.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: false
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Auth backend is running" });
});

// Mount routes (API base paths)
app.use("/api/auth/register", registerRouter);
app.use("/api/auth/login", loginRouter);
app.use("/api/users", allUsersRouter);     // GET /api/users
app.use("/api/auth/me", userDataRouter);   // GET /api/auth/me (protected)

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();
