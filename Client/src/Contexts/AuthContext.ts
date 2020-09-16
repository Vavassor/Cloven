import { createContext } from "react";

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
};

export interface LogInAction {
  type: "LOG_IN";
}

export interface LogOutAction {
  type: "LOG_OUT";
}

export type AuthAction = LogInAction | LogOutAction;

export const AuthContext = createContext(initialAuthState);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isAuthenticated: true,
      };

    case "LOG_OUT":
      return {
        ...state,
        isAuthenticated: false,
      };
  }
};
