import express from "express";
import { searchRecent } from "../../../../controllers/Post";
import { asyncHandler } from "../../../../utilities/AsyncHandler";
import { validateSearchRecent } from "../../../../validation/Post";

const router = express.Router();

router.route("/").get(validateSearchRecent, asyncHandler(searchRecent));

export { router };
