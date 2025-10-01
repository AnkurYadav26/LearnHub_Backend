import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Course
    },
    rating:{
        type:Number,
        required: true
    },
    comment:{
        type:String,
        required: true
    }
},{timestamps: true})

export const Review = mongoose.model("Review",reviewSchema)