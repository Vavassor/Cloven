import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
} from "../../../controllers/Post";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import {
  validateCreatePost,
  validateDeletePost,
  validateGetPostById,
  validateGetPosts,
} from "../../../validation/Post";
import { router as searchRoutes } from "./search";

const router = express.Router();

router.route("/").delete(validateDeletePost, asyncHandler(deletePost));
router.route("/").get(validateGetPosts, asyncHandler(getPosts));
router.route("/").post(validateCreatePost, asyncHandler(createPost));
router.route("/:id").get(validateGetPostById, asyncHandler(getPostById));
router.use("/search", searchRoutes);

export { router };
