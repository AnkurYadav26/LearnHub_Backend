import mongoose from "mongoose"
import { DB_Name } from "../constant.js"
const connectDb = async ()=>{
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`)
        console.log(`/nDB Connected successfully on host ${connectInstance.connection.host}`)
        
    } catch (error) {
        console.log("error in connecting Data Base ", error)
        process.exit(1)
    }
}
export default connectDb;