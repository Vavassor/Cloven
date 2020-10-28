import { body } from "express-validator";
import { handleValidationError } from "../middleware/ValidationErrorHandler";
import { isUri } from "./Uri";

export const validateCreateApp = [
  body("name").exists(),
  body("redirect_uri").exists().custom(isUri),
  body("website").exists().isURL(),
  handleValidationError,
];
