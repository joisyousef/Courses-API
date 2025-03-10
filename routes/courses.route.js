import express from "express";
// import { body, validationResult } from "express-validator";
import courseController from "../controllers/courses.controllers.js";
import validationSchema from "../middlewares/validationSchema.js";

const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(validationSchema(), courseController.addCourse);
router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deteleCourse);
export default router;
