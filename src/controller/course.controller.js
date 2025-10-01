import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/ApiError.js"
import { apiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import { Course } from "../models/course.models.js"

const createCourse = asyncHandler(async (req, res) => {
    const { title, description, category, price } = req.body
    if ([title, description, category, price].some((field) => field?.trim() === "")) {
        throw new apiError(400, "all fields are require")
    }
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new apiError(404, "User not found");
    }
    if (!(user.role.toString() === "teacher")) {
        throw new apiError(403, "you are not authorized to create course")
    }
    const newCourse = await Course.create(
        {
            title,
            description,
            category,
            price,
            instructorId: user._id
        }
    )
    if (!newCourse) {
        throw new apiError(500, "error in creating the course")
    }
    return res
        .status(200)
        .json(new apiResponse(201, newCourse, "Course Created successfully"))
})
const getCourse = asyncHandler(async (req, res) => {
    const courses = await Course.find()
    if (!courses) {
        throw new apiError(401, "error in fetching all courses")
    }
    return res
        .status(200)
        .json(new apiResponse(200, courses, "all courses are fetched successfully"))
})
const getCourseById = asyncHandler(async (req, res) => {
    const { courseId } = req.params
    if (!courseId) {
        throw new apiError(400, "courseId Not get or fetched")
    }
    const course = await Course.findById(courseId)
    if (!course) {
        throw new apiError(400, "course not found")
    }
    return res
        .status(200)
        .json(new apiResponse(200, course, "course data by id fetched successfully"))

})
const enrollStudent = asyncHandler(async (req, res) => {
    const { courseId } = req.body
    const userId = req.user?._id
    if(userId.roll.toString()==="Teacher"){
        throw new apiError(403,"only student can enroll in courses")
    }
    if (!courseId) {
        throw new apiError(400, "Course ID is required")
    }
    const course = await Course.findById(courseId)
    if (!course) {
        throw new apiError(404, "Course not found")
    }
    const alreadyEnrolled = course.students.includes(userId)
    if (alreadyEnrolled) {
        throw new apiError(400, "User already enrolled in this course")
    }
    course.students.push(userId)
    await course.save()

    // 6️⃣ Optionally update user’s enrolledCourses
    await User.findByIdAndUpdate(userId, { $addToSet: { enrolledCourses: courseId } })

    // 7️⃣ Send success response
    return res.status(200).json(
        new apiResponse(200, { courseId }, "Enrollment successful"))
})

export{
    createCourse,
    getCourse,
    getCourseById,
    enrollStudent
}