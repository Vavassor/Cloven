import { SendPasswordResetAdo } from "../../Types/Ado/SendPasswordResetAdo";
import { Id } from "../../Types/Domain/PasswordResetResult";
import { SideChannelType } from "../../Types/SideChannelType";
import { getBeginPasswordResetAdo, getIdAdo } from "../Mapping/AdoMapping";
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

export const sendPasswordReset = async (
  sideChannelId: string,
  sideChannelType: SideChannelType,
  id: Id
) => {
  const sendPasswordResetAdo: SendPasswordResetAdo = {
    side_channel: {
      id: sideChannelId,
      type: sideChannelType,
    },
    id: getIdAdo(id),
  };
  await callApi("account/send_password_reset", {
    body: sendPasswordResetAdo,
    method: "POST",
  });
};
