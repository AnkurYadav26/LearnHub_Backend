import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/ApiError.js"
import { apiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(
            500,
            "something went wrong while generating access and refresh tokens "
        );
    }
}
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body
    if ([username, role, email, password].some((field) => field?.trim() === "")) {
        throw new apiError(400, "all fields are require")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new apiError(409, "user already existed");
    }
    const user = await User.create({
        username,
        email,
        role,
        password
    })
    const createdUser = await User.findById(user._id).select("-password -refreshtokens");
    if (!createdUser) {
        throw new apiError(500, " Something went wrong while registring the user");
    }
    return res
        .status(201)
        .json(new apiResponse(200, createdUser, "User registered successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!(username || email) && !password) {
        throw new apiError(400, "username or email , and password is required to login")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (!user) {
        throw new apiError(404, "User not found pls register first")
    }
    const isPasswordValid = await user.isPassworCorrect(password)
    if (!isPasswordValid) {
        throw new apiError(401, " invalid credintials password wrong  ");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const option = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "user logged in successfully "
            )
        );

})
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: null },
        },
        {
            new: true,
        }
    )
    const option = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new apiResponse(200, {}, "User Logout Successfully"))
})
const ChangeCurrentPassword = asyncHandler(async (req, res) => {
    const { password, newPassword } = req.body
    if (!password || !newPassword) {
        throw new apiError(400, "Both old and new passwords are required");
    }
    const user = await User.findById(req.user._id)
    const isPasswordValid = await user.isPassworCorrect(password)
    if (!isPasswordValid) {
        throw new apiError(401, "Old password is incorrect");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
        .status(200)
        .json(new apiResponse(200, {}, "Password changed successfully"));
})
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new apiResponse(200, req.user, "current user fetched successfully"));
});
const refreshAcccesstoken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new apiError(401, "unauthorized request in incoming token ");
    }
    try {
        const decodetoken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodetoken?._id)
        if (!user) {
            throw new apiError(401, "unauthorized user after decode ");
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, " refreshtoken is expired or used");
        }
        const option = {
      httpOnly: true,
      secure: true,
    };
     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
     return res
      .status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json(
        new apiResponse(
          200,
          { accessToken, refreshToken },
          "accessToken refreshed successfully"
        )
      );
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid refresh token");
    }

})

export{
    registerUser,
    loginUser,
    logoutUser,
    ChangeCurrentPassword,
    getCurrentUser,
    refreshAcccesstoken
}