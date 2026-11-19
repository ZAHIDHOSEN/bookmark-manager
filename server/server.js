import mongoose from "mongoose"


const connectDB = async()=>{
    try {
        await mongoose.connect()
    } catch (error) {
       console.log("some error to start server",error) 
       res.status(500).json({
        message: "Internal server error"
       })
    }
}


connectDB()