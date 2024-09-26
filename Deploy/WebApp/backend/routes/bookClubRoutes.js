import express from "express";
const router = express.Router();

import {
  registerBookClub,
  joinBookClub,
  getAllBookClubs,
  getUserBookClubs,
  getBookClubDetails,
  getTop5ForBookClub,
} from "../controllers/bookClubControllers.js";

router.post("/register", registerBookClub);

router.post("/join", joinBookClub);

router.get("/getClubs", getAllBookClubs);

router.get("/:userId/bookClubs", getUserBookClubs);

router.get("/:bookClubId", getBookClubDetails);

router.get("/:bookClubId/top5Lists", getTop5ForBookClub);

export default router;
