import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app =express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import userrouter from "./routes/user.router.js"
import courserouter from "./routes/course.router.js"
import lessonrouter from "./routes/lesson.router.js"
import progressrouter from "./routes/progress.router.js"
import reviewroutes from "./routes/review.routes.js"

app.use("/api/users", userrouter);
app.use("/api/course",courserouter)
app.use("/api/lesson",lessonrouter)
app.use("/api/progress",progressrouter)
app.use("/api/review",reviewroutes)


export {app}