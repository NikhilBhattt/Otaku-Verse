import express from "express";
import { register, login } from "../controllers/auth-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route Example
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}!` });
});

export default router;