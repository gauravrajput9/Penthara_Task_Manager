import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, markTaskAsComplete, markTaskIncomplete, updateTask } from "../controllers/tasks.controller.js";

const router = Router();

router.post("/createTask", createTask)
router.get("/getTasks", getTasks)
router.patch("/:id/complete", markTaskAsComplete)
router.delete("/deleteTask/:id", deleteTask)
router.get("/getTaskById", getTaskById)
router.patch("/:id/incomplete", markTaskIncomplete)
router.post("/updateTask", updateTask)

export default router