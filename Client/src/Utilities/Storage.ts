import { AccessToken, Userinfo } from "./Api/Auth";
import { findById, findIndexById } from "./Array";

export interface StoredAccount {
  access_token: {
    access_token: string;
    expiration_date: string;
  };
  id: string;
  refresh_token: string;
}

const accountsKey = "accounts";

const isStoredAccount = (value: any): value is StoredAccount => {
  return (
    typeof value === "object" &&
    typeof value.access_token === "object" &&
    typeof value.access_token.access_token === "string" &&
    typeof value.access_token.expiration_date === "string" &&
    typeof value.id === "string" &&
    typeof value.refresh_token === "string"
  );
};

const isStoredAccountArray = (value: any): value is StoredAccount[] => {
  return (
    Array.isArray(value) && !value.find((account) => !isStoredAccount(account))
  );
};

const storeAccounts = (accounts: StoredAccount[]) => {
  localStorage.setItem(accountsKey, JSON.stringify(accounts));
};

export const createStoredAccount = (
  token: AccessToken,
  userinfo: Userinfo
): StoredAccount => {
  const { accessToken, expirationDate, refreshToken } = token;
  const { accountId } = userinfo;

  if (!refreshToken) {
    throw new Error("Expected a refresh token when storing an account.");
  }

  return {
    access_token: {
      access_token: accessToken,
      expiration_date: expirationDate.toISOString(),
    },
    id: accountId,
    refresh_token: refreshToken,
  };
};

export const loadAccounts = (): StoredAccount[] => {
  const json = localStorage.getItem(accountsKey);
  const accounts = json ? JSON.parse(json) : [];

  if (!isStoredAccountArray(accounts)) {
    throw new Error(`Failed loading "${accountsKey}" from storage.`);
  }

  return accounts;
};

export const loadAccount = (accountId: string): StoredAccount | undefined => {
  const accounts = loadAccounts();
  const account = findById(accounts, accountId);
  return account;
};

export const removeAccount = (accountId: string) => {
  const accounts = loadAccounts();
  const foundIndex = findIndexById(accounts, accountId);
  accounts.splice(foundIndex, 1);
  storeAccounts(accounts);
};

export const storeAccount = (account: StoredAccount) => {
  const accounts = loadAccounts();
  const foundIndex = findIndexById(accounts, account.id);
  if (foundIndex === -1) {
    accounts.push(account);
  } else {
    accounts[foundIndex] = account;
  }
  storeAccounts(accounts);
};
