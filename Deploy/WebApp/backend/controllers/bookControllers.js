import Book from "../models/bookModel.js";

const registerBook = async (req, res) => {
  const { title, author, genres, rating } = req.body;

  if (!title || !author || !genres || rating === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ error: "Book already exists" });
    }

    const newBook = new Book({
      title,
      author,
      genres,
      rating,
    });

    await newBook.save();

    res
      .status(200)
      .json({ message: "Book registered successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books

    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(books); // Return all books in response
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch books", details: error.message });
  }
};

export { registerBook, getAllBooks };
