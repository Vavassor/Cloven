import { getBeginPasswordResetAdo } from "../Mapping/AdoMapping";
import {
  getAccountFromAccountAdo,
  getPasswordResetResult,
} from "../Mapping/DomainMapping";
import {
  isAccountAdo,
  isPasswordResetResultAdo,
} from "../Typeguards/AdoTypeguards";
import { callApi } from "./Api";

interface AccountSpecAdo {
  email: string;
  password: string;
  username: string;
}

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

export const beginPasswordReset = async (query: string) => {
  const beginPasswordResetAdo = getBeginPasswordResetAdo(query);
  const passwordResetResult = await callApi("account/begin_password_reset", {
    body: beginPasswordResetAdo,
    method: "POST",
  });

  if (!isPasswordResetResultAdo(passwordResetResult)) {
    throw new Error(
      "The response body was not the expected type 'PasswordResetResultAdo'."
    );
  }

  return getPasswordResetResult(passwordResetResult);
};
