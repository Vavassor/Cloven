import { body, oneOf } from "express-validator";
import { handleOAuthValidationError } from "../middleware/ValidationErrorHandler";
import { validateAuthorizationHeader } from "./AuthorizationHeader";
import {
  isVisibleString,
  isPassword,
  isScopeList,
  isUsername,
  MAX_CHARS_PASSWORD,
  MAX_CHARS_USERNAME,
  MIN_CHARS_PASSWORD,
  MIN_CHARS_USERNAME,
} from "./OAuth";

export const validateGrantToken = [
  body("client_id").optional().custom(isVisibleString),
  body("client_secret").optional().custom(isVisibleString),
  oneOf([
    [
      body("grant_type").equals("password"),
      body("username")
        .exists()
        .isLength({ min: MIN_CHARS_USERNAME, max: MAX_CHARS_USERNAME })
        .custom(isUsername),
      body("password")
        .exists()
        .isLength({ min: MIN_CHARS_PASSWORD, max: MAX_CHARS_PASSWORD })
        .custom(isPassword),
      body("scope").optional().custom(isScopeList),
    ],
    [
      body("grant_type").equals("refresh_token"),
      body("refresh_token").exists().custom(isVisibleString),
      body("scope").optional().custom(isScopeList),
    ],
  ]),
  handleOAuthValidationError,
];

export const validateGetUserinfo = [
  ...validateAuthorizationHeader,
  handleOAuthValidationError,
];
