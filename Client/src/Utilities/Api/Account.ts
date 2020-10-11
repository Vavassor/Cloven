import { SendPasswordResetAdo } from "../../Types/Ado/SendPasswordResetAdo";
import { Id } from "../../Types/Domain/IdentifyAccountResult";
import { RecoveryMethodType } from "../../Types/RecoveryMethodType";
import { getIdAdo, getIdentifyAccountAdo } from "../Mapping/AdoMapping";
import {
  getAccountFromAccountAdo,
  getIdentifyAccountResult,
} from "../Mapping/DomainMapping";
import {
  isAccountAdo,
  isIdentifyAccountResultAdo,
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

export const identifyAccount = async (query: string) => {
  const identifyAccountAdo = getIdentifyAccountAdo(query);
  const identifyAccountResultAdo = await callApi("account/identify_account", {
    body: identifyAccountAdo,
    method: "POST",
  });

  if (!isIdentifyAccountResultAdo(identifyAccountResultAdo)) {
    throw new Error(
      "The response body was not the expected type 'IdentifyAccountResultAdo'."
    );
  }

  return getIdentifyAccountResult(identifyAccountResultAdo);
};

export const sendPasswordReset = async (
  recoveryMethodId: string,
  recoveryMethodType: RecoveryMethodType,
  id: Id
) => {
  const sendPasswordResetAdo: SendPasswordResetAdo = {
    recovery_method: {
      id: recoveryMethodId,
      type: recoveryMethodType,
    },
    id: getIdAdo(id),
  };
  await callApi("account/send_password_reset", {
    body: sendPasswordResetAdo,
    method: "POST",
  });
};
