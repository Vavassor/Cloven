import { callApi } from "./Api";

interface PostAdo {
  content: string;
  creation_time: string;
  id: string;
  title: string;
}

export interface Post {
  content: string;
  creationTime: Date;
  id: string;
  title: string;
}

const getPostFromPostAdo = (postAdo: PostAdo): Post => {
  const { content, creation_time, id, title } = postAdo;
  return {
    content,
    creationTime: new Date(creation_time),
    id,
    title,
  };
};

const isPostAdoArray = (postAdos: any): postAdos is PostAdo[] => {
  return Array.isArray(postAdos);
};

export const searchRecentPosts = async (): Promise<Post[]> => {
  const postAdos = await callApi("post/search/recent", {
    method: "GET",
  });

  if (!isPostAdoArray(postAdos)) {
    throw new Error("The response body was not the expected type 'PostAdo[]'.");
  }

  return postAdos.map(getPostFromPostAdo);
};
