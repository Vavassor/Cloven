import { RequestHandler } from "express";
import { ValidationError, validationResult } from "express-validator";
import { getErrorAdoFromValidationErrorArray } from "../mapping/ErrorAdo";
import { getOAuthErrorAdoFromValidationErrorArray } from "../mapping/OAuthErrorAdo";
import { englishT } from "../server";

const flattenValidationErrors = (errors: ValidationError[]) => {
  let flattenedErrors: ValidationError[] = [];
  for (const error of errors) {
    if (error.param === "_error") {
      const nestedErrors = error.nestedErrors as ValidationError[];
      flattenedErrors = flattenedErrors.concat(nestedErrors);
    } else {
      flattenedErrors.push(error);
    }
  }
  return flattenedErrors;
};

export const handleValidationError: RequestHandler = (
  request,
  response,
  next
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response
      .status(400)
      .json(
        getErrorAdoFromValidationErrorArray(
          flattenValidationErrors(errors.array()),
          request.t
        )
      );
    return;
  }
  next();
};

export const handleOAuthValidationError: RequestHandler = (
  request,
  response,
  next
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response
      .status(400)
      .json(
        getOAuthErrorAdoFromValidationErrorArray(
          flattenValidationErrors(errors.array()),
          englishT,
          request.t
        )
      );
    return;
  }
  next();
};
