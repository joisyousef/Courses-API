import { validationResult } from "express-validator";
import { Course } from "../models/course.model.js";
import httpStatusText from "../utils/httpStatusText.js";
const getAllCourses = async (req, res) => {
  // Get all courses from the database
  const courses = await Course.find({}, { __v: 0 });

  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
};
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "Course Not Found" },
      });
    }
    res.json({ status: "success", data: { course } });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: httpStatusText.ERROR,
      message: err.message,
      code: 400,
    });
  }
};
const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: errors.array() });
  }
  console.log("errors", errors);

  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
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
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course: updatedCourse },
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ status: httpStatusText.ERROR, message: message, code: 400 });
  }
};
const deteleCourse = async (req, res) => {
  const course = await Course.deleteOne({ _id: req.params.id });
  if (!course) {
    return res.status(404).json({ msg: "Course not found" });
  }
  res.status(200).json({ status: "success", data: null });
};

const courseController = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deteleCourse,
};

export default courseController;
