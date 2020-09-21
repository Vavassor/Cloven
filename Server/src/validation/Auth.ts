import { body, oneOf } from "express-validator";
import { handleValidationError } from "../middleware/ValidationErrorHandler";

export const validateGrantToken = [
  oneOf([
    [
      body("grant_type").equals("password"),
      body("username").exists(),
      body("password").exists(),
      body("client_id").exists(),
    ],
  ]),
  handleValidationError,
];
