import type { Document as MongooseDocument } from "mongoose";
import { PostAdo } from "../models/PostAdo";

export const getPostAdo = (post: MongooseDocument): PostAdo => {
  const { content, creation_time, _id, title } = post.toObject();
  return {
    content,
    creation_time,
    id: _id,
    title,
  };
};
