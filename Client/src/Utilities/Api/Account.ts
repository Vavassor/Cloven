import { callApi } from "./Api";

interface AccountAdo {
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

  return account;
};
