import express from "express"
import cors from "cors"




const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"welcome to bookmark manager server"
    })
})

export default app