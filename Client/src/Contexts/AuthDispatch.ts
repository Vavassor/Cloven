import { createContext, Dispatch } from "react";
import { AccessToken, AuthAction } from "./AuthContext";

const noop = () => {};

export const AuthDispatch = createContext<Dispatch<AuthAction>>(noop);

export const logIn = (
  accessToken: AccessToken,
  accountId: string
): AuthAction => {
  return {
    accessToken,
    accountId,
    type: "LOG_IN",
  };
};

export const logOut = (): AuthAction => {
  return {
    type: "LOG_OUT",
  };
};
