import express from "express";
import { getAccountTimelinePosts } from "../../../../controllers/Post";
import { authorizeToken } from "../../../../middleware/AuthorizeToken";
import { enableCors, handleCorsPreflight } from "../../../../middleware/Cors";
import { asyncHandler } from "../../../../utilities/AsyncHandler";
import { validateGetAccountTimelinePosts } from "../../../../validation/Post";

const router = express.Router();

router
  .route("/")
  .get(
    enableCors,
    validateGetAccountTimelinePosts,
    authorizeToken,
    asyncHandler(getAccountTimelinePosts)
  )
  .options(handleCorsPreflight);

export { router };
