import { Account } from "../../types/domain/Account";

export const getAccountFromDocument = (accountDocument: any): Account => {
  const { email, _id, password, username } = accountDocument;
  return {
    email,
    id: _id.toString(),
    password,
    username,
  };
};
