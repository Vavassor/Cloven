import express from "express";
import { router as accountRoutes } from "./account";
import { router as authRoutes } from "./auth";
import { router as postRoutes } from "./post";

const router = express.Router();

router.use("/account", accountRoutes);
router.use("/auth", authRoutes);
router.use("/post", postRoutes);

export { router };
