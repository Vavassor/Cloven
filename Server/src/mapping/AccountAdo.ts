import type { Document as MongooseDocument } from "mongoose";

export const getAccountAdo = (account: MongooseDocument) => {
  const { email, _id, username } = account.toObject();
  return {
    email,
    id: _id.toString(),
    username,
  };
};
