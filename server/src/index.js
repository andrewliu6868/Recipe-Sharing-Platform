import express from 'express';
// const experss = require('express')
import cors from 'cors'; // setup rules for communication between server and frontend
import mongoose from 'mongoose'; // db management system for mongodb
import dotenv from 'dotenv';  

dotenv.config(); // Load in environment variables

// import routes
import {userRouter} from "./routes/users.js";

const app = express();

// middleware
app.use(express.json()); // convert requests into json
app.use(cors());
app.use("/authenticate", userRouter);

// connect to MongoDB and catch for errors
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB")).catch(err => console.error("Could not connect to MongoDB ", err));
app.listen(3005,() => console.log("Server running..."));