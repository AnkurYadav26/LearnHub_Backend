import Router from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { ChangeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAcccesstoken, registerUser } from "../controller/user.controller.js"

const router=Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/changepassword").post(verifyJWT,ChangeCurrentPassword)
router.route("/currentuser").get(verifyJWT,getCurrentUser)
router.route("/regentoken").post(refreshAcccesstoken)
export default router 