import dotenv from "dotenv"
dotenv.config();
import connectDb from "./db/index.js";
import { app } from "./app.js";
import { log } from "node:console";
connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`App Is running on local Host ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("error while running the app", err)
})