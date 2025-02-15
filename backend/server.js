import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cloudinary from "cloudinary";
import songRoutes from "./routes/songRoutes.js"
import path from "path";
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api_key,
  api_secret: process.env.Cloud_Secret,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://spotify-project-tujq.onrender.com",
    credentials: true,
  })
);


app.use("/user", userRoutes);
app.use("/spotify", songRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
  connectDB();
});
