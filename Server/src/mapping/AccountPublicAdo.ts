import { Account } from "../types/domain/Account";

export const getAccountPublicAdoFromAccount = (account: Account) => {
  const { id, username } = account;
  return {
    id,
    username,
  };
};
