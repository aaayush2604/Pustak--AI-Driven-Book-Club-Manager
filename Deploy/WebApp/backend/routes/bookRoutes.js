import express from "express";
const router = express.Router();

import { getAllBooks, registerBook } from "../controllers/bookControllers.js";

router.post("/register", registerBook);

router.get("/getBooks", getAllBooks);

export default router;
