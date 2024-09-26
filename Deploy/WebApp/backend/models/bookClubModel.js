import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookClubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numberOfMembers: {
      type: Number,
      required: true,
    },
    currentRead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: false,
    },
    previouslyRead: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

// Create the BookClub model
const BookClub = mongoose.model("BookClub", bookClubSchema);

export default BookClub;
