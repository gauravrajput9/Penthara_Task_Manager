import { Router } from "express";
import { createTask, getTasks } from "../controllers/tasks.controller.js";

const router = Router();

router.post("/createTask", createTask)
router.get("/getTasks", getTasks)
export default router