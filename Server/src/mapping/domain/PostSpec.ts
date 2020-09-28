import { PostSpecAdo } from "../../types/ado/PostSpecAdo";
import { PostSpec } from "../../types/domain/PostSpec";

export const getPostSpecFromPostSpecAdo = (
  postSpecAdo: PostSpecAdo
): PostSpec => {
  const { content, title } = postSpecAdo;
  return {
    content,
    title,
  };
};
