import { PostAdo } from "../types/ado/PostAdo";
import { Post } from "../types/domain/Post";
import { getAccountAdoFromAccount } from "./AccountAdo";

export const getPostAdoFromPost = (post: Post): PostAdo => {
  const { account, content, creationDate, id, title } = post;
  return {
    account: getAccountAdoFromAccount(account),
    content,
    creation_date: creationDate,
    id,
    title,
  };
};
