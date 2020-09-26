import { createContext } from "react";

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
