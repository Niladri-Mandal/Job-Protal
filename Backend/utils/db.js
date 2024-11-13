import mongoose from "mongoose"; 

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Datebase connect succesfully`)
    }catch(error){
     console.log(err)
    }
}