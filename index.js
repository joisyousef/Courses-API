import express from "express";
import coursesRoute from "./routes/courses.route.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

const url =
  "mongodb+srv://yousefelsrogy:nodejs_123@learn-mongo-db.b8kgf8f.mongodb.net/";
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

app.use("/api/courses", coursesRoute);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
