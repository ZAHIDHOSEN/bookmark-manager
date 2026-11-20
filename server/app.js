import express from "express"
import cors from "cors"
import { BookmarkRoute } from "./routes/bookmark.routes.js"




const app = express()

app.use(cors())
app.use(express.json())


app.use("/api/bookmarks",BookmarkRoute)

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to bookmark manager server"
    })
})



export default app