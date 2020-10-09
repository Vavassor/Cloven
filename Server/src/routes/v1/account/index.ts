import express from "express";
import {
  beginPasswordReset,
  createAccount,
  deleteAccount,
  getAccountById,
  sendPasswordReset,
} from "../../../controllers/Account";
import {
  enableCors,
  forDevelopmentEnvironment,
  handleCorsPreflight,
} from "../../../middleware/Cors";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import {
  validateBeginPasswordReset,
  validateCreateAccount,
  validateDeleteAccount,
  validateGetAccountById,
  validateSendPasswordReset,
} from "../../../validation/Account";

const router = express.Router();

router.route("/").post(validateCreateAccount, asyncHandler(createAccount));
router.route("/:id").delete(validateDeleteAccount, asyncHandler(deleteAccount));
router.route("/:id").get(validateGetAccountById, asyncHandler(getAccountById));
router
  .route("/begin_password_reset")
  .post(
    validateBeginPasswordReset,
    forDevelopmentEnvironment(enableCors),
    asyncHandler(beginPasswordReset)
  )
  .options(handleCorsPreflight);
router
  .route("/send_password_reset")
  .post(
    validateSendPasswordReset,
    forDevelopmentEnvironment(enableCors),
    asyncHandler(sendPasswordReset)
  )
  .options(handleCorsPreflight);

export { router };
