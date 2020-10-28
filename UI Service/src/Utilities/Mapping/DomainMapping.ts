import { AccountAdo, AccountPublicAdo } from "../../Types/Ado/AccountAdo";
import { IdentifyAccountResultAdo } from "../../Types/Ado/IdentifyAccountResultAdo";
import { Account, AccountPublic } from "../../Types/Domain/Account";
import { IdentifyAccountResult } from "../../Types/Domain/IdentifyAccountResult";

export const getAccountFromAccountAdo = (accountAdo: AccountAdo): Account => {
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

export const getIdentifyAccountResult = (
  identifyAccountResult: IdentifyAccountResultAdo
): IdentifyAccountResult => {
  const { id, recovery_methods } = identifyAccountResult;
  return {
    id,
    recoveryMethods: recovery_methods,
  };
};
