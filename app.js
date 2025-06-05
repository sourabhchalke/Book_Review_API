import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
const app=express();

// Connecting MongoDB
mongoose.connect(`${process.env.MONGO_URI}/book-review-api`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/',(req,res)=>{
    res.send("API Working...");
})

app.listen(process.env.PORT,()=>{
    console.log("Server running on PORT : ",process.env.PORT);
})