import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);

const PORT = process.env.PORT;

// database connection

mongoose.connect(process.env.DATABASE);
try {
  if (mongoose.connect) {
    console.log("mongoose connected succesfully");
  } else {
    console.log("mongooose is not connected");
  }
} catch (error) {
  console.log("mongoose disconnected", error);
}

app.listen(PORT, () => {
  console.log(`${PORT} is connected succesfully`);
});
