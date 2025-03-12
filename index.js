import express from "express";
import coursesRoute from "./routes/courses.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import httpStatusText from "./utils/httpStatusText.js";

dotenv.config();

const app = express();
app.use(express.json());

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

app.use(cors());

app.use("/api/courses", coursesRoute);

// Glopal Error Handler
app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Route not foudnd" });
});
// Glopal Middleware Error Handler
app.use((error, req, res, next) => {
  res.status(500).json({
    status: error.httpStatusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
