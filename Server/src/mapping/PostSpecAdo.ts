import { CreateQuery, Document as MongooseDocument } from "mongoose";
import { PostSpecAdo } from "../types/ado/PostSpecAdo";

export const getPostFromPostSpecAdo = (
  postSpecAdo: PostSpecAdo
): CreateQuery<MongooseDocument> => {
  const { content, title } = postSpecAdo;
  return {
    content,
    creation_time: new Date().toISOString(),
    title,
  };
};
