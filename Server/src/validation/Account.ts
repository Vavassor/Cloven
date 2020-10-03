import { body, param } from "express-validator";
import { handleValidationError } from "../middleware/ValidationErrorHandler";
import {
  isPassword,
  isUsername,
  MAX_CHARS_PASSWORD,
  MAX_CHARS_USERNAME,
  MIN_CHARS_PASSWORD,
  MIN_CHARS_USERNAME,
} from "./OAuth";
import { isObjectId } from "./ObjectId";

export const validateCreateAccount = [
  body("email").exists().isEmail(),
  body("password")
    .exists()
    .isLength({ max: MAX_CHARS_PASSWORD, min: MIN_CHARS_PASSWORD })
    .custom(isPassword),
  body("username")
    .exists()
    .isLength({ max: MAX_CHARS_USERNAME, min: MIN_CHARS_USERNAME })
    .custom(isUsername),
  handleValidationError,
];

export const validateDeleteAccount = [
  param("id").exists().custom(isObjectId),
  handleValidationError,
];

export const validateGetAccountById = [
  param("id").custom(isObjectId),
  handleValidationError,
];

export const validateBeginPasswordReset = [
  body("email").exists().isEmail(),
  handleValidationError,
];
