import express from "express";
import { router as recentRoutes } from "./recent";

const router = express.Router();

router.use("/recent", recentRoutes);

export { router };
