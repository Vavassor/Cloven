import { body, param } from "express-validator";
import { handleValidationError } from "../middleware/ValidationErrorHandler";
import { isObjectId } from "./ObjectId";

export const validateCreateAccount = [
  body("email").exists().isEmail(),
  body("password").exists(),
  body("username").exists(),
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
