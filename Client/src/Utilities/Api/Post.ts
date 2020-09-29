import { Account, AccountAdo, getAccountFromAccountAdo } from "./Account";
import { callApi } from "./Api";

interface PostAdo {
  account: AccountAdo;
  content: string;
  creation_date: string;
  id: string;
  title: string;
}

export interface Post {
  account: Account;
  content: string;
  creationDate: Date;
  id: string;
  title: string;
}

const getPostFromPostAdo = (postAdo: PostAdo): Post => {
  const { account, content, creation_date, id, title } = postAdo;
  return {
    account: getAccountFromAccountAdo(account),
    content,
    creationDate: new Date(creation_date),
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
