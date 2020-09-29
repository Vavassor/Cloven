import { Post } from "../../types/domain/Post";
import { getAccountFromDocument } from "./Account";

export const getPostFromDocument = (postDocument: any): Post => {
  const { account, content, _id, title } = postDocument;
  const timestamp = _id.getTimestamp();
  return {
    account: getAccountFromDocument(account),
    content,
    creationDate: timestamp.toISOString(),
    id: _id.toString(),
    title,
  };
};
