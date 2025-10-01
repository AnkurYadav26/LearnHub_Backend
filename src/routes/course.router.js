import Router from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { createCourse, enrollStudent, getCourse, getCourseById } from "../controller/course.controller.js"

const router =Router()
router.route("/createcourse").post(verifyJWT,createCourse)
router.route("/courses").get(verifyJWT,getCourse)
router.route("/:courseId").get(verifyJWT,getCourseById)
router.route("/:courseId/enroll").post(verifyJWT,enrollStudent)

export default router