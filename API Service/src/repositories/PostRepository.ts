import { getPostFromDocument } from "../mapping/domain/Post";
import { Post as PostModel } from "../models";
import { Post } from "../types/domain/Post";
import { PostSpec } from "../types/domain/PostSpec";
import { getQuerySelector } from "../utilities/Pagination";

export const createPost = async (spec: PostSpec) => {
  const { content, title } = spec;
  const postDocument = (await PostModel.create({ content, title })).populate({
    path: "account",
  });
  return getPostFromDocument(postDocument.toObject());
};

export const deletePost = async (id: string) => {
  return PostModel.deleteOne({ _id: id });
};

export const findPostById = async (id: string): Promise<Post | null> => {
  const post = await PostModel.findById(id).populate({ path: "account" });
  if (!post) {
    return null;
  }
  return getPostFromDocument(post.toObject());
};

export const findPostsById = async (ids: string[]): Promise<Post[]> => {
  const posts = await PostModel.find({ _id: ids }).populate({
    path: "account",
  });
  return posts.map((post) => post.toObject()).map(getPostFromDocument);
};

export const findAccountTimelinePosts = async (
  accountId: string,
  sinceId: string | undefined,
  untilId: string | undefined,
  limit: number
) => {
  const idQuery = getQuerySelector(sinceId, untilId);
  const conditions = idQuery ? { _id: idQuery } : {};
  const posts = await PostModel.find(
    {
      account_id: accountId,
      ...conditions,
    },
    undefined,
    {
      sort: "-creation_date",
    }
  )
    .limit(limit)
    .populate({ path: "account" });
  return posts.map((post) => post.toObject()).map(getPostFromDocument);
};
