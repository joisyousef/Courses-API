import { courses } from "../data/courses.js";
import { validationResult } from "express-validator";
import { Course } from "../models/course.model.js";

const getAllCourses = async (req, res) => {
  // Get all courses from the database
  const courses = await Course.find();

  res.json(courses);
};
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Invalid Object ID" });
  }
};
const addCourse = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("errors", errors);
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.updateOne(
      { _id: req.params.id },
      {
        $set: { ...req.body },
      }
    );
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
};
const deteleCourse = (req, res) => {
  const course = courses.filter(
    (course) => course.id !== parseInt(req.params.id)
  );
  res.status(200).json(course);
};

const courseController = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deteleCourse,
};

export default courseController;
