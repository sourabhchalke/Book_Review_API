import { json } from 'express';
import bookModel from '../models/Books.js';

// Add books
const addBook = async (req, res) => {
    try {

       const { title, author, genre, description, publishedYear,averageRating,totalReviews } = req.body;

    // Create the new book using the logged-in user's ID
    const newBook = await bookModel.create({
      title,
      author,
      genre,
      description,
      publishedYear,
      createdBy: req.user._id,
      averageRating,
      totalReviews,
    });

    res.status(200).json({success:true,message:"Book Added Successfully"});

    } catch (error) {
        res.status(401).json({ success: false, message: error });
        console.log(error);
    }
}

export { addBook };