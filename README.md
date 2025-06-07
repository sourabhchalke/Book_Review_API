Creating folder structure.
Installing express,mongoose,bcryptjs,jsonwebtoken and dotenv packages.
Connected to MongoDB.
Create User,Review and Book Models.
Create Controller and Routes for user signup and signin using bcryptjs(for password hashing) and jsonwebtoken.
Create controller which handles new book creation(add books-only authorized user) using authMiddleware(for authentication).
Get all books (with pagination and optional filters by author and genre).
Get book details by ID.
Submit review (Authenticated users only, one review per user per book).