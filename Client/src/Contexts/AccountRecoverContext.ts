import { createContext } from "react";
import { IdentifyAccountResult } from "../Types/Domain/IdentifyAccountResult";

export interface AccountRecoveryState {
  identifyAccountResult: IdentifyAccountResult | null;
}

export interface IdentifyAccountResultAction {
  identifyAccountResult: IdentifyAccountResult;
  type: "IDENTIFY_ACCOUNT_RESULT";
}

export type AccountRecoveryAction = IdentifyAccountResultAction;

export const initialAccountRecoveryState: AccountRecoveryState = {
  identifyAccountResult: null,
};

export const AccountRecoveryContext = createContext(
  initialAccountRecoveryState
);

export const accountRecoveryReducer = (
  state: AccountRecoveryState,
  action: AccountRecoveryAction
): AccountRecoveryState => {
  switch (action.type) {
    case "IDENTIFY_ACCOUNT_RESULT":
      return {
        ...state,
        identifyAccountResult: action.identifyAccountResult,
      };

    default:
      return state;
  }
};
