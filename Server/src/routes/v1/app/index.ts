import express from "express";
import { validateCreateApp } from "../../../validation/App";
import { createApp } from "../../../controllers/App";

const router = express.Router();

router.route("/").post(validateCreateApp, createApp);

export { router };
