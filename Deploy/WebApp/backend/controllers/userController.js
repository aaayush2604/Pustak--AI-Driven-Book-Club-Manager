import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET_JWT, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create a token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ username: user.username, email, token, userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signUpUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.signUp(email, password, username);
    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token, username, userId: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update top5 for a user
const updateTop5 = async (req, res) => {
  const { username, top5list } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.top5 = top5list;
    await user.save();
    res
      .status(200)
      .json({ message: "Top 5 numbers updated successfully", top5: user.top5 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users); // Return all users in response
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
};

export { loginUser, signUpUser, updateTop5, getAllUsers };
