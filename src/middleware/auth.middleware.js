import {apiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"

export const verifyJWT = asyncHandler(async (req, _, next)=>{
    try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
            if(!token){
                throw new apiError(401,"absence of token or unauthorized request")
            }
            const decodetoken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(decodetoken?._id).select("-password -refreshtoken")
            if (!user) {
                throw new apiError(401, "user not found pr invalid authorization")
            }
            req.user =user
            next()
    } catch (error) {
        throw new apiError(401, error?.message || "error in authrization middleware")
    }
})