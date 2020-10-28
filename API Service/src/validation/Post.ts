import { body, param, query } from "express-validator";
import { handleValidationError } from "../middleware/ValidationErrorHandler";
import { isObjectId, isObjectIdList } from "./ObjectId";

export const MAX_SEARCH_RESULTS = 100;

export const validateCreatePost = [
  body("content").exists(),
  body("title").exists(),
  handleValidationError,
];

export const validateDeletePost = [
  param("id").exists().custom(isObjectId),
  handleValidationError,
];

export const validateGetPosts = [
  query("ids").exists().custom(isObjectIdList),
  handleValidationError,
];

export const validateGetPostById = [
  param("id").exists().custom(isObjectId),
  handleValidationError,
];

export const validateGetAccountTimelinePosts = [
  query("limit")
    .optional()
    .isInt({ allow_leading_zeroes: false, max: MAX_SEARCH_RESULTS, min: 0 }),
  query("since_id").optional().custom(isObjectId),
  query("until_id").optional().custom(isObjectId),
  handleValidationError,
];
