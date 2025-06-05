import express from 'express';
import bcryptjs from 'bcryptjs';
import userModel from '../models/User.js';
import jwt from 'jsonwebtoken';


const userSignUp = async(req,res)=>{

    try {
        const {name,email,password}=req.body;
        console.log(name,email,password);

        // Checking user already exists or not
        const exists = await userModel.findOne({email});

          if(exists){
            return res.json({success:false,message:"User Already Exists"});
        }

         // Validating Email Format & Strong Password
        // if(!validator.isEmail(email)){
        //     return res.json({success:false,message:"Please enter a valid email"})
        // }
         if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const hashedPassword = await bcryptjs.hash(password,10);

         // Creating new User
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save();
        console.log("User Created",user);
        
        const userId = user._id;

        // Genrating Token
        const token = jwt.sign({userId},process.env.SECRET_KEY);
        res.json({success:true,token})


    } catch (error) {
        res.json({success:false,message:error.message});
        console.log(error);
    }

}

export  {userSignUp};