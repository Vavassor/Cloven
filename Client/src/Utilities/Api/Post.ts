import {
  AccountPublic,
  AccountPublicAdo,
  getAccountPublicFromAccountPublicAdo,
} from "./Account";
import { callApi } from "./Api";

interface PostAdo {
  account: AccountPublicAdo;
  content: string;
  creation_date: string;
  id: string;
  title: string;
}

export interface Post {
  account: AccountPublic;
  content: string;
  creationDate: Date;
  id: string;
  title: string;
}

const getPostFromPostAdo = (postAdo: PostAdo): Post => {
  const { account, content, creation_date, id, title } = postAdo;
  return {
    account: getAccountPublicFromAccountPublicAdo(account),
    content,
    creationDate: new Date(creation_date),
    id,
    title,
  };
};

const isPostAdoArray = (postAdos: any): postAdos is PostAdo[] => {
  return Array.isArray(postAdos);
};

export const getAccountTimelinePosts = async (accessToken: string): Promise<Post[]> => {
  const postAdos = await callApi("post/account_timeline", {
    bearerToken: accessToken,
    method: "GET",
  });

  if (!isPostAdoArray(postAdos)) {
    throw new Error("The response body was not the expected type 'PostAdo[]'.");
  }
  
  return postAdos.map(getPostFromPostAdo);
};
