import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { connectDB } from './utils/db.js';
// own create module
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'

// .env config
dotenv.config({})

const app=express();
const PORT=process.env.PORT||3000;

// Datebase connect
 connectDB()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOption))




// api's
// user api
app.use("/api/v1/user",userRoute)
// company api
app.use("/api/v1/company",companyRoute)


app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(`server running on port ${PORT}`);
    }
})




