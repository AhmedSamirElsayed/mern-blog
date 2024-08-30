import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("server is running on port 3000!!!");
});
