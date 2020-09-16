import express from "express";
import {
  createAccount,
  deleteAccount,
  getAccountById,
} from "../../../controllers/Account";
import {
  validateCreateAccount,
  validateDeleteAccount,
  validateGetAccountById,
} from "../../../validation/Account";

const router = express.Router();

router.route("/").post(validateCreateAccount, createAccount);
router.route("/:id").delete(validateDeleteAccount, deleteAccount);
router.route("/:id").get(validateGetAccountById, getAccountById);

export { router };
