
import bookModel from '../models/Books.js';
import reviewModel from '../models/Reviews.js';


// Add books
const addBook = async (req, res) => {
    try {

        const { title, author, genre, description, publishedYear, averageRating, totalReviews } = req.body;

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

        res.status(200).json({ success: true, message: "Book Added Successfully" });

    } catch (error) {
        res.status(401).json({ success: false, message: error });
        console.log(error);
    }
}

// Fetching all books
const getBooks = async (req, res) => {
    try {
        // Destructure query parameters
        const { author, genre, page = 1, limit = 10 } = req.query;

        // Build filter object
        const filter = {};
        if (author) filter.author = author;
        if (genre) filter.genre = genre;

        // Convert pagination values to numbers
        const skip = (Number(page) - 1) * Number(limit);

        // Fetch filtered and paginated books
        const books = await bookModel.find(filter)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 }); // newest first

        // Count total books matching filter
        const totalBooks = await bookModel.countDocuments(filter);

        res.status(200).json({
            success: true,
            books,
        });

    } catch (error) {
        res.status(401).json({ success: false, message: error });
        console.log(error);
    }
}

const getBookById = async (req, res) => {
    try {
        // Destructuring params
        const { id } = req.params;

        // Pagination values from query (default page 1, limit 5)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // Getting book by id
        const book = await bookModel.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        // Total reviews count (for pagination)
        const totalReviews = await reviewModel.countDocuments({ book: id });

        // 2. Get reviews with pagination
        const reviews = await reviewModel
            .find({ book: id })
            .populate('user', 'username')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({ success: true, book, reviews ,pagination: {
        totalReviews,
        currentPage: page,
        totalPages: Math.ceil(totalReviews / limit)
    }});

    } catch (error) {
        res.status(401).json({ success: false, message: error });
        console.log(error);
    }
}

const searchBook = async (req, res) => {
    try {

        console.log(req.query);
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        const searchRegex = new RegExp(q, 'i'); // 'i' for case-insensitive

        const findBook = await bookModel.find({
            $or: [
                { title: { $regex: searchRegex } },
                { author: { $regex: searchRegex } },
            ]
        });
        console.log("Book : ", findBook);

        res.status(200).json({ success: true, message: "Success" });

    } catch (error) {
        res.status(401).json({ success: false, message: error });
        console.log(error);
    }
}

export { addBook, getBooks, getBookById, searchBook };