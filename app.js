import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import bookRouter from './routes/bookRoute.js';
import reviewRouter from './routes/reviewRoute.js';
const app=express();

// Connecting MongoDB
mongoose.connect(`${process.env.MONGO_URI}/book-review-api`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


//   Middleware
app.use(express.json());

// API Endpoints
// For User
app.use('/api/user',userRouter);
// For books
app.use('/api/book',bookRouter);
// For Reviews
app.use('/api/book',reviewRouter);

app.get('/',(req,res)=>{
    res.send("API Working...");
})

app.listen(process.env.PORT,()=>{
    console.log("Server running on PORT : ",process.env.PORT);
})