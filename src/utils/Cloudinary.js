import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import { apiError } from "./ApiError"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    if (!localFilePath) {
        throw new apiError(400, "File path missing")
    }
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);

        }
        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw new apiError(500, error.message || "error in uploading on cloudinary")
    }
}
    export { uploadOnCloudinary };
