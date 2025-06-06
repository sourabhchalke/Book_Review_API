import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authentication function
const authUser = async(req,res,next)=>{
    try {
    const {token}=req.headers;

    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Make sure SECRET_KEY matches your .env

    // Fetch user from DB (for extra safety)
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = user; // Now req.user._id is valid
    next();

        } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export default authUser;