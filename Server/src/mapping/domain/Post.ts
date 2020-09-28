import { Post } from "../../types/domain/Post";

export const getPostFromDocument = (postDocument: any): Post => {
  const { content, _id, title } = postDocument;
  const timestamp = _id.getTimestamp();
  return {
    content,
    creationDate: timestamp.toISOString(),
    id: _id.toString(),
    title,
  };
};
