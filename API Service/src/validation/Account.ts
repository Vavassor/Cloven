import { body, oneOf, param } from "express-validator";
import { handleValidationError } from "../middleware/ValidationErrorHandler";
import { IdType } from "../types/IdType";
import { RecoveryMethodType } from "../types/RecoveryMethodType";
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

export const validateIdentifyAccount = [
  oneOf([
    body("query").exists().isEmail(),
    body("query").exists().custom(isUsername),
  ]),
  handleValidationError,
];

export const validateUpdatePassword = [
  body("password").exists().custom(isPassword),
  handleValidationError,
];

export const validateSendPasswordReset = [
  oneOf([
    [body("id.email").isEmail(), body("id.type").equals(IdType.Email)],
    [
      body("id.type").equals(IdType.Username),
      body("id.username").custom(isUsername),
    ],
  ]),
  oneOf([
    [
      body("recovery_method.id").isString(),
      body("recovery_method.type").equals(RecoveryMethodType.Email),
    ],
  ]),
  handleValidationError,
];
