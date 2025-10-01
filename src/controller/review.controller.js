import { Review } from "../models/review.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { isValidObjectId } from "mongoose";
import {apiError} from "../utils/ApiError.js";
import {apiResponse} from "../utils/ApiResponse.js";

// POST /api/courses/:id/reviews - Add review
export const addReview = asyncHandler(async (req, res) => {
    const { id: courseId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; // Assuming verifyJWT adds user object

    // Validate courseId
    if (!isValidObjectId(courseId)) {
        throw new apiError(400, "Invalid Course ID");
    }

    // Validate input
    if (!rating || rating < 1 || rating > 5) {
        throw new apiError(400, "Rating must be between 1 and 5");
    }

    if (!comment || comment.trim() === "") {
        throw new apiError(400, "Comment is required");
    }

    // Check if user already reviewed this course (optional)
    const existingReview = await Review.findOne({ userId, courseId });
    if (existingReview) {
        throw new apiError(400, "You have already reviewed this course");
    }

    // Create review
    const review = await Review.create({
        userId,
        courseId,
        rating,
        comment
    });

    return res.status(201).json(
        new apiResponse(201, review, "Review added successfully")
    );
});

// GET /api/courses/:id/reviews - Get all reviews for a course
export const getReviews = asyncHandler(async (req, res) => {
    const { id: courseId } = req.params;

    if (!isValidObjectId(courseId)) {
        throw new apiError(400, "Invalid Course ID");
    }

    const reviews = await Review.find({ courseId })
        .populate("userId", "name email") // Populate user info (optional)
        .sort({ createdAt: -1 }); // Latest first

    return res.status(200).json(
        new apiResponse(200, reviews, "Reviews fetched successfully")
    );
});
