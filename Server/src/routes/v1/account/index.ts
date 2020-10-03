import express from "express";
import {
  beginPasswordReset,
  createAccount,
  deleteAccount,
  getAccountById,
} from "../../../controllers/Account";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import {
  validateBeginPasswordReset,
  validateCreateAccount,
  validateDeleteAccount,
  validateGetAccountById,
} from "../../../validation/Account";

const router = express.Router();

router.route("/").post(validateCreateAccount, asyncHandler(createAccount));
router.route("/:id").delete(validateDeleteAccount, asyncHandler(deleteAccount));
router.route("/:id").get(validateGetAccountById, asyncHandler(getAccountById));
router
  .route("/reset_password")
  .post(validateBeginPasswordReset, asyncHandler(beginPasswordReset));

export { router };
