import express from "express";
import { grantToken } from "../../../controllers/Auth";
import {
  enableCors,
  forNonPasswordGrants,
} from "../../../middleware/Cors";
import { validateGrantToken } from "../../../validation/Auth";

const router = express.Router();

router
  .route("/token")
  .post(
    validateGrantToken,
    forNonPasswordGrants(enableCors),
    grantToken
  );

export { router };
