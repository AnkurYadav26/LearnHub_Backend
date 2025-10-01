import express from "express";
import { addReview, getReviews } from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router({ mergeParams: true }); // mergeParams allows accessing :id from parent route

// Add review (protected)
router.post("/:id/reviews", verifyJWT, addReview);

// Get all reviews
router.get("/:id/reviews", getReviews);

export default router;
