import { Account } from "../types/domain/Account";

export const getAccountAdoFromAccount = (account: Account) => {
  const { email, id, username } = account;
  return {
    email,
    id,
    username,
  };
};
