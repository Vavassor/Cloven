import express from "express";
import { enableCors } from "../../middleware/Cors";
import { router as accountRoutes } from "./account";
import { router as authRoutes } from "./auth";
import { router as postRoutes } from "./post";

const router = express.Router();

router.use("/account", enableCors, accountRoutes);
router.use("/auth", authRoutes);
router.use("/post", enableCors, postRoutes);

export { router };
