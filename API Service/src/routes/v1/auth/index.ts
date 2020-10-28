import express from "express";
import { getUserinfo, grantToken } from "../../../controllers/Auth";
import { authenticateClient } from "../../../middleware/AuthenticateClient";
import {
  enableCors,
  forNonPasswordGrants,
  handleCorsPreflight,
} from "../../../middleware/Cors";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import {
  validateGetUserinfo,
  validateGrantToken,
} from "../../../validation/Auth";

const router = express.Router();

router
  .route("/token")
  .options(forNonPasswordGrants(handleCorsPreflight))
  .post(
    validateGrantToken,
    forNonPasswordGrants(enableCors),
    authenticateClient,
    asyncHandler(grantToken)
  );
router
  .route("/userinfo")
  .get(validateGetUserinfo, enableCors, asyncHandler(getUserinfo))
  .options(handleCorsPreflight);

export { router };
