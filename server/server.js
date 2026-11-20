import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app.js"


dotenv.config()

const URL = process.env.DB_URL
const PORT = process.env.PORT || 5000

const connectDB = async()=>{
    try {
        await mongoose.connect(URL) 
        console.log("connect to db")
    } catch (error) {
       console.log("some error to start server",error) 
       process.exit(1);
    }
}


const startServer = async()=>{
    await connectDB()
    if (!process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`)
    })
  }
}


startServer()

export default app