import express from "express";
import { getProgress, updateProgress } from "../controllers/progress.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET progress
router.get("/:userId/:courseId", verifyJWT, getProgress);

// POST update progress
router.post("/:userId/:courseId", verifyJWT, updateProgress);

export default router;
