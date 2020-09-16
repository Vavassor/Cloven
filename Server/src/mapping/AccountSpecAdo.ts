import { CreateQuery, Document as MongooseDocument } from "mongoose";
import { AccountSpecAdo } from "../models/AccountSpecAdo";
import { hash } from "../utilities/Password";

export const getAccountFromAccountSpecAdo = async (
  accountSpecAdo: AccountSpecAdo
) => {
  const { email, password, username } = accountSpecAdo;
  const hashedPassword = await hash(password);
  const query: CreateQuery<MongooseDocument> = {
    email,
    password: hashedPassword,
    username,
  };
  return query;
};
