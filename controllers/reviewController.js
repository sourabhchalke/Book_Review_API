import reviewModel from '../models/Reviews.js';
import bookModel from '../models/Books.js';
import userModel from '../models/User.js';

const addReview = async (req, res) => {
    try {

        // console.log("Request body : ",req.body);
        // console.log("Request book id : ",req.params.id);
        // console.log("Request user id :",req.user.id);

        const { rating, comment } = req.body;
        const bookId = req.params.id;
        const userId = req.user.id;

        const bookFind = bookModel.findById(bookId);
        if (!bookFind) {
            return res.status(404).json({ success: false, message: "Book Not Found" });
        }

        const userFind = userModel.findById({ userId });
        if (!userFind) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const submitReview = await reviewModel({
            book: bookId,
            user: userId,
            rating,
            comment
        })
        await submitReview.save();
        console.log("Review Submitted");
        res.status(401).json({ success: true, message: "Review Submitted" });

    } catch (error) {
        // 👇 Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'You have already reviewed this book',
            });
        }

        res.status(401).json({ success: false, message: error });
        console.log(error);
    }
}

const updateReview = async (req, res) => {
    try {

        // console.log("Request : ", req.body);
        // console.log("Request : ", req.params.id);
        // console.log("Request : ", req.user.id);

        const { rating, comment } = req.body;
        const reviewId = req.params.id;
        const userId = req.user.id;

        const reviewFind = await reviewModel.findById(reviewId);
        if (!reviewFind) {
            return res.status(404).json({ success: false, message: "Review Not Found" });
        }

        // 2. Check if the logged-in user is the owner of the review
        if (reviewFind.user.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this review" });
        }

        const update = await reviewModel.updateOne({
            rating,
            comment
        })

        res.status(200).json({ success: true, update });

    } catch (error) {
        res.status(401).json({ success: false, message: error });
        console.log(error);
    }
}

export { addReview, updateReview };