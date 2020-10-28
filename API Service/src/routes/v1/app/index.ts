import express from "express";
import { createApp } from "../../../controllers/App";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import { validateCreateApp } from "../../../validation/App";

const router = express.Router();

router.route("/").post(validateCreateApp, asyncHandler(createApp));

export { router };
