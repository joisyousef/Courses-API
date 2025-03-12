import { body } from "express-validator";

const validationSchema = () => {
  return [
    body("title").isLength({ min: 5 }).withMessage("Title is required"),
    body("price").isNumeric().withMessage("Price is required"),
  ];
};

export default validationSchema;
