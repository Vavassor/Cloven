import { createContext } from "react";
import { PasswordResetResult } from "../Types/Domain/PasswordResetResult";

export interface AccountRecoveryState {
  passwordResetResult: PasswordResetResult | null;
}

export interface PasswordResetResultAction {
  passwordResetResult: PasswordResetResult;
  type: "PASSWORD_RESET_RESULT";
}

export type AccountRecoveryAction = PasswordResetResultAction;

export const initialAccountRecoveryState: AccountRecoveryState = {
  passwordResetResult: null,
};

export const AccountRecoveryContext = createContext(
  initialAccountRecoveryState
);

export const accountRecoveryReducer = (
  state: AccountRecoveryState,
  action: AccountRecoveryAction
): AccountRecoveryState => {
  switch (action.type) {
    case "PASSWORD_RESET_RESULT":
      return {
        ...state,
        passwordResetResult: action.passwordResetResult,
      };

    default:
      return state;
  }
};
