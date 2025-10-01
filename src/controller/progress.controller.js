import { Progress } from "../models/progress.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { isValidObjectId } from "mongoose";
import {apiError} from "../utils/ApiError.js";
import {apiResponse} from "../utils/ApiResponse.js";

// GET progress for a user in a course
export const getProgress = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.params;

    // Validate IDs
    if (!isValidObjectId(userId) || !isValidObjectId(courseId)) {
        throw new apiError(400, "Invalid User ID or Course ID");
    }

    // Find progress
    const progress = await Progress.findOne({ userId, courseId });

    if (!progress) {
        return res.status(200).json(
            new apiResponse(200, { completedLesson: [], lastVisit: null }, "No progress found")
        );
    }

    return res.status(200).json(
        new apiResponse(200, progress, "Progress fetched successfully")
    );
});

// POST update progress for a user in a course
export const updateProgress = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.params;
    const { completedLesson } = req.body;

    // Validate IDs
    if (!isValidObjectId(userId) || !isValidObjectId(courseId)) {
        throw new apiError(400, "Invalid User ID or Course ID");
    }

    if (!Array.isArray(completedLesson)) {
        throw new apiError(400, "completedLesson must be an array");
    }

    // Find existing progress
    let progress = await Progress.findOne({ userId, courseId });

    if (progress) {
        // Update completed lessons and last visit
        progress.completedLesson = completedLesson;
        progress.lastVisit = new Date();
        await progress.save();
    } else {
        // Create new progress
        progress = await Progress.create({
            userId,
            courseId,
            completedLesson,
            lastVisit: new Date()
        });
    }

    return res.status(200).json(
        new apiResponse(200, progress, "Progress updated successfully")
    );
});
