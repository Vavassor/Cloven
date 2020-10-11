import { createContext, Dispatch } from "react";
import { IdentifyAccountResult } from "../Types/Domain/IdentifyAccountResult";
import {
  AccountRecoveryAction,
  IdentifyAccountResultAction,
} from "./AccountRecoverContext";

const noop = () => {};

export const AccountRecoveryDispatch = createContext<
  Dispatch<AccountRecoveryAction>
>(noop);

export const setIdentifyAccountResult = (
  identifyAccountResult: IdentifyAccountResult
): IdentifyAccountResultAction => {
  return {
    identifyAccountResult,
    type: "IDENTIFY_ACCOUNT_RESULT",
  };
};
