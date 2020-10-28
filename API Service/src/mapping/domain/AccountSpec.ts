import { AccountSpecAdo } from "../../types/ado/AccountSpecAdo";
import { AccountSpec } from "../../types/domain/AccountSpec";

export const getAccountSpecFromAccountSpecAdo = (
  accountSpecAdo: AccountSpecAdo
): AccountSpec => {
  const { email, password, username } = accountSpecAdo;
  return {
    email,
    password,
    username,
  };
};
