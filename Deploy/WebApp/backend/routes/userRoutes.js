import express from "express";
import {
  getAllUsers,
  loginUser,
  signUpUser,
  updateTop5,
} from "../controllers/userController.js";
const router = express.Router();

//Login Route
router.post("/login", loginUser);

//SignUp Route
router.post("/signup", signUpUser);

//get or update Top 5
router.post("/preference", updateTop5);

//get all users
router.get("/getUsers", getAllUsers);

export default router;
