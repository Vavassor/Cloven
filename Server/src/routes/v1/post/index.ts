import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
} from "../../../controllers/Post";
import {
  validateCreatePost,
  validateDeletePost,
  validateGetPostById,
  validateGetPosts,
} from "../../../validation/Post";
import { router as searchRoutes } from "./search";

const router = express.Router();

router.route("/").delete(validateDeletePost, deletePost);
router.route("/").get(validateGetPosts, getPosts);
router.route("/").post(validateCreatePost, createPost);
router.route("/:id").get(validateGetPostById, getPostById);
router.use("/search", searchRoutes);

export { router };
