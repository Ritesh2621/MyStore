// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';



const app = express();

import { ProductRouter } from "./Routes/productRoute.js";
import { UserRouter } from "./Routes/userRoute.js";



app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/auth',UserRouter);
app.use('/product',ProductRouter);



mongoose.connect('mongodb+srv://learnopediacontact:Space612@cluster0.h6tja.mongodb.net/')
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.log("MongoDB connection error:", e);
  });


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));