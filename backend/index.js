// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';



const app = express();

import { ProductRouter } from "./Routes/productRoute.js";
import { UserRouter } from "./Routes/userRoute.js";
import { OrderRouter } from "./Routes/orderRoute.js";
import { PartnerRouter } from "./Routes/partnerRoute.js";
import { AdminRouter } from "./Routes/adminRoute.js";
import { SupplierRouter } from "./Routes/supplierRoute.js";



app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Only allow frontend origin
  credentials: true,               // Allow cookies
  allowedHeaders: ['Content-Type', 'Authorization'], // Ensure headers are allowed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
};
app.use(cors(corsOptions));

app.use(cookieParser());


app.use('/auth',UserRouter);
app.use('/product',ProductRouter);
app.use('/order',OrderRouter);
app.use('/partner',PartnerRouter);
app.use('/admin',AdminRouter);
app.use('/supplier',SupplierRouter);



mongoose.connect('mongodb+srv://learnopediacontact:Space612@cluster0.h6tja.mongodb.net/')
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => {
    console.log("MongoDB connection error:", e);
  });


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));