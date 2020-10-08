import { getAccountFromDocument } from "../mapping/domain/Account";
import { Account as AccountModel } from "../models";
import { Account } from "../types/domain/Account";
import { AccountSpec } from "../types/domain/AccountSpec";
import { hash } from "../utilities/Password";

export const createAccount = async (spec: AccountSpec) => {
  const { email, password, username } = spec;
  const hashedPassword = await hash(password);
  const accountDocument = await AccountModel.create({
    email,
    password: hashedPassword,
    username,
  });
  return getAccountFromDocument(accountDocument.toObject());
};

export const deleteAccount = async (id: string) => {
  AccountModel.deleteOne({ _id: id });
};

export const findAccountByEmail = async (
  email: string
): Promise<Account | null> => {
  const accountDocument = await AccountModel.findOne({ email });
  if (!accountDocument) {
    return null;
  }
  return getAccountFromDocument(accountDocument.toObject());
};

export const findAccountById = async (id: string) => {
  const accountDocument = await AccountModel.findById(id);
  if (!accountDocument) {
    return null;
  }
  return getAccountFromDocument(accountDocument.toObject());
};

export const findAccountByUsername = async (
  username: string
): Promise<Account | null> => {
  const accountDocument = await AccountModel.findOne({ username });
  if (!accountDocument) {
    return null;
  }
  return getAccountFromDocument(accountDocument.toObject());
};
