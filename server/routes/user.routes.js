import express from "express"
import { getMe, login, logout, register } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.get("/getMe", protectRoute, getMe)
router.get("/logout", protectRoute, logout)

export default router