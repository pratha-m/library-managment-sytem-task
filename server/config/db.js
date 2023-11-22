import mongoose from "mongoose";

const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.DB_URL);
       console.log("Database Connection Succeded");
    }
    catch(error){
        console.log("Error in connecting To DB ",error.message);
    }
}

export {connectDB};