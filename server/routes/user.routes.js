import express from "express";
import { getMe, login, logout, register } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create user (register)
router.post("/", register);

// Login
router.post("/login", login);

// Current authenticated user
router.get("/me", protectRoute, getMe);

// Logout
router.post("/logout", protectRoute, logout);

export default router;