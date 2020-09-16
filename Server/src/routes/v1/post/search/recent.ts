import express from "express";
import { searchRecent } from "../../../../controllers/Post";
import { validateSearchRecent } from "../../../../validation/Post";

const router = express.Router();

router.route("/").get(validateSearchRecent, searchRecent);

export { router };
