import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//routes
import userRoutes from "./routes/userRoutes.js";
import bookClubRoutes from "./routes/bookClubRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/bookClub", bookClubRoutes);
app.use("/book", bookRoutes);

// app.use("/", (req, res) => {
//   const obj = {
//     Msg: "Hello",
//   };
//   return res.json(obj);
// });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on Port: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
