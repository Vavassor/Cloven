import { CreateQuery, Document as MongooseDocument } from "mongoose";
import { PostSpecAdo } from "../models/PostSpecAdo";

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
