import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import {connectDB} from "./config/db.js";
import booksRoute from "./routes/booksRoutes.js";

const app=express();

const port=process.env.PORT;

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/v1/library/book",booksRoute);

app.listen(port,()=>{
    console.log(`Server is Running at PORT:${port}`);
})
