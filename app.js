import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
const app=express();

// Connecting MongoDB
mongoose.connect(`${process.env.MONGO_URI}/book-review-api`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


//   Middleware
app.use(express.json());

// API Endpoints
app.use('/api/user',userRouter);

app.get('/',(req,res)=>{
    res.send("API Working...");
})

app.listen(process.env.PORT,()=>{
    console.log("Server running on PORT : ",process.env.PORT);
})