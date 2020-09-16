import { createContext, Dispatch } from "react";
import { AuthAction } from "./AuthContext";

const noop = () => {};

export const AuthDispatch = createContext<Dispatch<AuthAction>>(noop);

export const logIn = (): AuthAction => {
  return {
    type: "LOG_IN",
  };
};

export const logOut = (): AuthAction => {
  return {
    type: "LOG_OUT",
  };
};
