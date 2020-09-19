import { body } from "express-validator";
import { handleValidationError } from "../middleware/ValidationErrorHandler";

export const validateCreateApp = [
  body("name").exists(),
  body("redirect_uri").exists(),
  body("website").exists().isURL(),
  handleValidationError,
];
