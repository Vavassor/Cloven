import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { getErrorAdoFromValidationErrorArray } from "../mapping/ErrorAdo";

export const handleValidationError: RequestHandler = (
  request,
  response,
  next
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response
      .status(400)
      .json(getErrorAdoFromValidationErrorArray(errors.array(), request.t));
    return;
  }
  next();
};
