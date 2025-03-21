import { body } from "express-validator";

const formValidator = [
  body("fullname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Fullname name is required")
    .isLength({ min: 4 })
    .withMessage("First name must be at least 4 characters"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Must contain at least one uppercase letter")
    .matches(/[\W]/)
    .withMessage("Must contain at least one special character")
    .trim(),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("dateofbirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isDate()
    .withMessage("Please provide a valid date of birth"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female"]) // Adjust this array as needed
    .withMessage("Gender must be one of the following: male or female"),
];

export default formValidator;
