import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  markTaskAsComplete,
  markTaskIncomplete,
  updateTask
} from "../controllers/tasks.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

/**
 * GET /api/tasks
 * Get all tasks
 */
router.get("/", getTasks);

/**
 * POST /api/tasks
 * Create a new task
 */
router.post("/", createTask);

/**
 * GET /api/tasks/:id
 * Get single task
 */
router.get("/:id", getTaskById);

/**
 * PUT /api/tasks/:id
 * Update full task (or PATCH if partial update)
 */
router.put("/:id", updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete task
 */
router.delete("/:id", deleteTask);

/**
 * PATCH /api/tasks/:id/complete
 */
router.patch("/:id/complete", markTaskAsComplete);

/**
 * PATCH /api/tasks/:id/incomplete
 */
router.patch("/:id/incomplete", markTaskIncomplete);

export default router;