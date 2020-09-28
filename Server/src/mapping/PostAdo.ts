import { PostAdo } from "../types/ado/PostAdo";
import { Post } from "../types/domain/Post";

export const getPostAdoFromPost = (post: Post): PostAdo => {
  const { content, creationDate, id, title } = post;
  return {
    content,
    creation_date: creationDate,
    id,
    title,
  };
};
