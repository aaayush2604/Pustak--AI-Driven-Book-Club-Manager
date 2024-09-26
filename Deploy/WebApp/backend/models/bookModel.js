import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    author: {
      type: String,
      required: true, // Author is required
    },
    genres: {
      type: [String], // Array of genres (e.g., Fiction, Sci-Fi, etc.)
      required: true, // Genres is required
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
