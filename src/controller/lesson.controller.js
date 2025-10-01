import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/ApiError.js"
import { apiResponse } from "../utils/ApiResponse.js"
import { Course } from "../models/course.models.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js"
import { Lesson } from "../models/lesson.models.js"
import { isValidObjectId } from "mongoose"

const addLesson = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    const { title } = req.body;
    const videoFileLocalPath = req.file?.path;
    if (!isValidObjectId(courseId)) {
        throw new apiError(400, "Invalid Course ID");
    }
    const course = await Course.findById(courseId)
    if (!course) {
        throw new apiError(404, "Course not found")
    }
    if (!title || title.trim() === "") {
        throw new apiError(400, "Title is required");
    }
    if (!videoFileLocalPath) {
        throw new apiError(400, "Video file required");
    }
    const videoUpload = await uploadOnCloudinary(videoFileLocalPath)
    if (!videoUpload?.url) {
        throw new apiError(500, "Error uploading video ");
    }
    const lesson = await Lesson.create({
        title: title,
        videoUrl: videoUpload.url,
        duration: videoUpload.duration || 0,
        courseId: courseId
    })

    return res
        .status(201)
        .json(new apiResponse(201, lesson, "lesson published successfully"));
})
const listLesson = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    if (!mongoose.isValidObjectId(courseId)) {
        throw new apiError(400, "Invalid Course ID");
    }
    const course = await Course.findById(courseId)
    if (!course) {
        throw new apiError(404, "Course not found")
    }
    const lessons = await Lesson.find({ courseId: courseId }).sort({ createdAt: 1 });
    if (!lessons || lessons.length === 0) {
        return res
            .status(200)
            .json(new apiResponse(200, [], "No lessons found for this course"));
    }
    return res
        .status(200)
        .json(new apiResponse(200, lessons, "Lessons fetched successfully"));
});
export {
    addLesson,
    listLesson
}