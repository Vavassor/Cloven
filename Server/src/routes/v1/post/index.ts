import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts
} from "../../../controllers/Post";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import {
  validateCreatePost,
  validateDeletePost,
  validateGetPostById,
  validateGetPosts
} from "../../../validation/Post";
import { router as accountTimelineRoutes } from "./account_timeline";

const router = express.Router();

router.use("/account_timeline", accountTimelineRoutes);
router.route("/").delete(validateDeletePost, asyncHandler(deletePost));
router.route("/").get(validateGetPosts, asyncHandler(getPosts));
router.route("/").post(validateCreatePost, asyncHandler(createPost));
router.route("/:id").get(validateGetPostById, asyncHandler(getPostById));

export { router };
