import Router from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { addLesson, listLesson } from "../controller/lesson.controller.js"
import {upload} from "../middleware/multer.middleware.js"

const router = Router()

router.route("/:coursId/uploadlessons").post(verifyJWT,upload.single("videoFile"),addLesson)
router.route(":courseId/lessons").get(verifyJWT,listLesson)

export default router