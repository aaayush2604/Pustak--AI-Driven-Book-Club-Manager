import BookClub from "../models/bookClubModel.js";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";

const registerBookClub = async (req, res) => {
  const { name, managerId, currentReadId, memberIds } = req.body;

  try {
    const manager = await User.findById({ _id: managerId });
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }

    let currentRead = null;
    if (currentReadId) {
      currentRead = await Book.findById(currentReadId);
      if (!currentRead) {
        return res.status(404).json({ error: "Current book not found" });
      }
    }

    let members = [];
    if (memberIds && memberIds.length > 0) {
      members = await User.find({ _id: { $in: memberIds } });
      if (members.length !== memberIds.length) {
        return res.status(404).json({ error: "Some members not found" });
      }
    }

    const newBookClub = new BookClub({
      name,
      manager: manager._id,
      numberOfMembers: members.length,
      currentRead: currentRead ? currentRead._id : null,
      previouslyRead: [],
      members: members.map((member) => member._id),
    });
    await newBookClub.save();

    res.status(200).json({
      message: "Book Club registered successfully",
      bookClub: newBookClub,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const joinBookClub = async (req, res) => {
  const { bookClubId, userId } = req.body;

  try {
    const bookClub = await BookClub.findById(bookClubId);
    if (!bookClub) {
      return res.status(404).json({ error: "Book Club not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (bookClub.members.includes(user._id)) {
      return res
        .status(400)
        .json({ error: "User is already a member of the Book Club" });
    }
    bookClub.members.push(user._id);
    bookClub.numberOfMembers = bookClub.members.length;
    await bookClub.save();

    res.status(200).json({
      message: "User successfully added to the Book Club",
      bookClub,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBookClubs = async (req, res) => {
  try {
    const bookClubs = await BookClub.find();
    if (!bookClubs || bookClubs.length === 0) {
      return res.status(404).json({ message: "No book clubs found" });
    }
    res.status(200).json(bookClubs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch book clubs", details: error.message });
  }
};

const getUserBookClubs = async (req, res) => {
  const { userId } = req.params; // Assume userId is passed as a URL parameter

  try {
    // Find all book clubs where the user is a member
    const bookClubs = await BookClub.find({ members: userId });

    if (!bookClubs || bookClubs.length === 0) {
      return res
        .status(404)
        .json({ message: "No book clubs found for this user" });
    }

    res.status(200).json(bookClubs);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch book clubs for the user",
      details: error.message,
    });
  }
};

// Controller to get the details of a specific Book Club by its ID
const getBookClubDetails = async (req, res) => {
  const { bookClubId } = req.params; // Get bookClubId from the request params

  try {
    // Find the book club by its ID
    const bookClub = await BookClub.findById(bookClubId);

    if (!bookClub) {
      return res.status(404).json({ message: "Book Club not found" });
    }

    // Send back the book club details
    res.status(200).json(bookClub);
  } catch (error) {
    // Handle errors (e.g., if bookClubId is invalid)
    res.status(500).json({
      error: "Failed to fetch the book club details",
      details: error.message,
    });
  }
};

const getTop5ForBookClub = async (req, res) => {
  const { bookClubId } = req.params;

  try {
    // Find the book club by ID
    const bookClub = await BookClub.findById(bookClubId).populate("members");
    if (!bookClub) {
      return res.status(404).json({ error: "Book Club not found" });
    }

    // Collect the top5 arrays of all members in the book club
    const top5Arrays = bookClub.members.map((member) => member.top5 || []);

    // Send the combined top5 arrays
    res.status(200).json({ top5Lists: top5Arrays });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch top 5 lists for the book club",
      details: error.message,
    });
  }
};

export {
  registerBookClub,
  joinBookClub,
  getAllBookClubs,
  getUserBookClubs,
  getBookClubDetails,
  getTop5ForBookClub,
};
