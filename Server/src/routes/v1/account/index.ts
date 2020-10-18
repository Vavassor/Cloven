import express from "express";
import {
  createAccount,
  deleteAccount,
  getAccountById,
  identifyAccount,
  sendPasswordReset,
  updatePassword,
} from "../../../controllers/Account";
import { authorizePasswordResetToken } from "../../../middleware/AuthorizeToken";
import {
  enableCors,
  forDevelopmentEnvironment,
  handleCorsPreflight,
} from "../../../middleware/Cors";
import { asyncHandler } from "../../../utilities/AsyncHandler";
import {
  validateCreateAccount,
  validateDeleteAccount,
  validateGetAccountById,
  validateIdentifyAccount,
  validateSendPasswordReset,
  validateUpdatePassword,
} from "../../../validation/Account";

const router = express.Router();

router.route("/").post(validateCreateAccount, asyncHandler(createAccount));
router.route("/:id").delete(validateDeleteAccount, asyncHandler(deleteAccount));
router.route("/:id").get(validateGetAccountById, asyncHandler(getAccountById));
router
  .route("/identify_account")
  .post(
    validateIdentifyAccount,
    forDevelopmentEnvironment(enableCors),
    asyncHandler(identifyAccount)
  )
  .options(handleCorsPreflight);
router
  .route("/password")
  .post(
    validateUpdatePassword,
    forDevelopmentEnvironment(enableCors),
    authorizePasswordResetToken,
    asyncHandler(updatePassword)
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
