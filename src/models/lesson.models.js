import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Course
    },
    duration:{
        type: Number
    }
    

},{timestamps: true})

export const Lesson =mongoose.model("Lesson",lessonSchema)