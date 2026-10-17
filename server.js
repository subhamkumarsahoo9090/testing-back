import dotenv from  "dotenv";
dotenv.config()
import express from "express";
import cors from "cors"
import colors from "colors"
import morgan from "morgan";
import connectDB from "./connectDB.js";
import cronJobs from "./ronJobs.js";
import userRouter from "./routers/userRouters.js"
import errorMiddleware, { httpError } from "./middleware/errorMiddleware.js";
export default (async()=>{
    const app=express()
    const port=process.env.PORT
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(cors(
        {
            origin:["http://localhost:3000"]
        }
    ))
    //for this one line user can now access any image from images folder 
    app.use("/file",express.static('./images'))
    cronJobs()
    await connectDB()
    app.post("/test",(req,res)=>{
    console.log(req.body)
    res.status(200).json({data:req.body})
    })
    app.use("/api/v1",userRouter)
    app.get("/",(req,res)=>{
        res.status(200).send({success:true,message:"server running successfully"})
    })
    app.use((req, res, next) => next(httpError("Route not found", 404)))
    app.use(errorMiddleware)

    app.listen(port,()=>{
        console.log(`server running successfully on ${port}`.bgGreen.white)
    })
})()