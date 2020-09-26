import { body, oneOf } from "express-validator";
import { handleOAuthValidationError } from "../middleware/ValidationErrorHandler";
import { validateAuthorizationHeader } from "./AuthorizationHeader";
import { isScopeList } from "./Scope";

export const validateGrantToken = [
  body("client_id").optional().isString(),
  body("client_secret").optional().isString(),
  oneOf([
    [
      body("grant_type").equals("password"),
      body("username").exists(),
      body("password").exists(),
      body("scope").optional().custom(isScopeList),
    ],
  ]),
  handleOAuthValidationError,
];

export const validateGetUserinfo = [
  ...validateAuthorizationHeader,
  handleOAuthValidationError,
];
