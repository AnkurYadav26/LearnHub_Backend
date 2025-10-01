import mongoose from "mongoose"

const progressSchema =new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: User
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: Course
    },
    completedLesson:{
        type:[]
    },
    lastVisit:{
        type: Date,
        required: true
    }
})
export const Progress = mongoose.model("Progress",progressSchema)