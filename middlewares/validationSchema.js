import { body } from "express-validator";

const validationSchema = () => {
  return [
    body("name").isLength({ min: 5 }).withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price is required"),
  ];
};

export default validationSchema;
