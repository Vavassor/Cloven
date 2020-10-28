import { createContext } from "react";
import { findById } from "../Utilities/Array";

export interface AccessToken {
  accessToken: string;
  expirationDate: Date;
}

export interface Account {
  accessToken: AccessToken;
  id: string;
}

export interface AuthState {
  accounts: Account[];
  activeAccountIndex: number;
}

export const initialAuthState: AuthState = {
  accounts: [],
  activeAccountIndex: -1,
};

export interface LogInAction {
  accessToken: AccessToken;
  accountId: string;
  type: "LOG_IN";
}

export interface LogOutAction {
  type: "LOG_OUT";
}

export interface RefreshAccessTokenAction {
  accessToken: AccessToken;
  accountId: string;
  type: "REFRESH_ACCESS_TOKEN";
}

export type AuthAction = LogInAction | LogOutAction | RefreshAccessTokenAction;

export const AuthContext = createContext(initialAuthState);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        accounts: state.accounts.concat({
          accessToken: action.accessToken,
          id: action.accountId,
        }),
        activeAccountIndex: state.accounts.length,
      };

    case "LOG_OUT": {
      if (state.activeAccountIndex === -1) {
        return state;
      }
      return {
        ...state,
        accounts: state.accounts.splice(state.activeAccountIndex, 1),
        activeAccountIndex:
          state.accounts.length > 1 ? state.accounts.length - 2 : -1,
      };
    }

    case "REFRESH_ACCESS_TOKEN": {
      const account = findById(state.accounts, action.accountId);
      if (account) {
        account.accessToken = action.accessToken;
      }
      return { ...state };
    }
  }
};

export const getActiveAccount = (authState: AuthState): Account | null => {
  const { activeAccountIndex } = authState;
  return activeAccountIndex !== -1
    ? authState.accounts[activeAccountIndex]
    : null;
};

export const isLoggedIn = (authState: AuthState): boolean => {
  return authState.activeAccountIndex !== -1;
};
