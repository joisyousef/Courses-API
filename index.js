import express from "express";
import coursesRoute from "./routes/courses.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/api/courses", coursesRoute);
app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Route not foudnd" });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
