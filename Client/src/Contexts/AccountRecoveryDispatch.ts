import { createContext, Dispatch } from "react";
import { PasswordResetResult } from "../Types/Domain/PasswordResetResult";
import {
  AccountRecoveryAction,
  PasswordResetResultAction,
} from "./AccountRecoverContext";

const noop = () => {};

export const AccountRecoveryDispatch = createContext<
  Dispatch<AccountRecoveryAction>
>(noop);

export const setPasswordResetResult = (
  passwordResetResult: PasswordResetResult
): PasswordResetResultAction => {
  return {
    passwordResetResult,
    type: "PASSWORD_RESET_RESULT",
  };
};
