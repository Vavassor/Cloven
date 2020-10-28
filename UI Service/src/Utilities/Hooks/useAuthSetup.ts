import { Account, AuthState } from "../../Contexts/AuthContext";
import { loadAccounts, StoredAccount } from "../../Utilities/Storage";

const getAccountFromStoredAccount = (account: StoredAccount): Account => {
  const { access_token, id } = account;
  return {
    id,
    accessToken: {
      accessToken: access_token.access_token,
      expirationDate: new Date(access_token.expiration_date),
    },
  };
};

export const useAuthSetup = (initialAuthState: AuthState): AuthState => {
  const loadedAccounts = loadAccounts();
  const accounts = loadedAccounts.map(getAccountFromStoredAccount);

  return {
    ...initialAuthState,
    accounts,
    activeAccountIndex: accounts.length - 1,
  };
};
