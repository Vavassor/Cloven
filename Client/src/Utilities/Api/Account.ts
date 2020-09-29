import { callApi } from "./Api";

export interface Account {
  email: string;
  id: string;
  username: string;
}

export interface AccountPublic {
  id: string;
  username: string;
}

export interface AccountPublicAdo {
  id: string;
  username: string;
}

export interface AccountAdo {
  email: string;
  id: string;
  username: string;
}

interface AccountSpecAdo {
  email: string;
  password: string;
  username: string;
}

const isAccountAdo = (account: any): account is AccountAdo => {
  return typeof account === "object" && account.username !== undefined;
};

const getAccountFromAccountAdo = (accountAdo: AccountAdo): Account => {
  const { email, id, username } = accountAdo;
  return {
    email,
    id,
    username,
  };
};

export const getAccountPublicFromAccountPublicAdo = (
  accountPublicAdo: AccountPublicAdo
): AccountPublic => {
  const { id, username } = accountPublicAdo;
  return {
    id,
    username,
  };
};

export const createAccount = async (
  username: string,
  password: string,
  email: string
) => {
  const accountSpecAdo: AccountSpecAdo = { email, username, password };
  const account = await callApi("account", {
    body: accountSpecAdo,
    method: "POST",
  });

  if (!isAccountAdo(account)) {
    throw new Error(
      "The response body was not the expected type 'AccountAdo'."
    );
  }

  return getAccountFromAccountAdo(account);
};
