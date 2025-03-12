import { validationResult } from "express-validator";
import { Course } from "../models/course.model.js";
import httpStatusText from "../utils/httpStatusText.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";

const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit | 10;
  const page = query.page | 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);

  res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getCourse = asyncWrapper(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    const error = appError.create("Course Not Found", 404, httpStatusText.FAIL);
    return next(error);
    // return res.status(404).json({ status: httpStatusText.FAIL, data: null });
  }
  return res.json({
    status: httpStatusText.SUCCESS,
    data: {
      course,
    },
  });
});
const addCourse = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
    // return res
    //   .status(400)
    //   .json({ status: httpStatusText.FAIL, data: errors.array() });
  }
  console.log("errors", errors);

  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const updatedCourse = await Course.updateOne(
    { _id: req.params.id },
    req.body
  );
  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { course: updateCourse } });
});

const deteleCourse = asyncWrapper(async (req, res) => {
  const course = await Course.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: "success", data: null });
});

const courseController = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deteleCourse,
};

export default courseController;
