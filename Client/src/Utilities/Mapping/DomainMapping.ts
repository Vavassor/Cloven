import { AccountAdo, AccountPublicAdo } from "../../Types/Ado/AccountAdo";
import { PasswordResetResultAdo } from "../../Types/Ado/PasswordResetResultAdo";
import { Account, AccountPublic } from "../../Types/Domain/Account";
import { PasswordResetResult } from "../../Types/Domain/PasswordResetResult";

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

export const getPasswordResetResult = (
  passwordResetResultAdo: PasswordResetResultAdo
): PasswordResetResult => {
  const { id, results } = passwordResetResultAdo;
  return {
    id,
    results,
  };
};
