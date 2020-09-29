import { PostAdo } from "../types/ado/PostAdo";
import { Post } from "../types/domain/Post";
import { getAccountPublicAdoFromAccount } from "./AccountPublicAdo";

export const getPostAdoFromPost = (post: Post): PostAdo => {
  const { account, content, creationDate, id, title } = post;
  return {
    account: getAccountPublicAdoFromAccount(account),
    content,
    creation_date: creationDate,
    id,
    title,
  };
};
