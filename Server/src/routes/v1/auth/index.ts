import express from "express";
import { grantToken } from "../../../controllers/Auth";
import { authenticateClient } from "../../../middleware/AuthenticateClient";
import { enableCors, forNonPasswordGrants } from "../../../middleware/Cors";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import { validateGrantToken } from "../../../validation/Auth";

const router = express.Router();

router
  .route("/token")
  .post(
    validateGrantToken,
    forNonPasswordGrants(enableCors),
    authenticateClient,
    asyncHandler(grantToken)
  );

export { router };
