import { Router } from "express";
import { createTask, deleteTask, getTasks, markTaskAsComplete } from "../controllers/tasks.controller.js";

const router = Router();

router.post("/createTask", createTask)
router.get("/getTasks", getTasks)
router.patch("/:id/complete", markTaskAsComplete)
router.delete("/deleteTask/:id", deleteTask)

export default router