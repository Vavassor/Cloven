import React, { useContext, useEffect, useRef, useState } from "react";
import { Feed } from "../../Components/Feed/Feed";
import { Post } from "../../Components/Post";
import { AuthContext, getActiveAccount } from "../../Contexts/AuthContext";
import { AuthDispatch } from "../../Contexts/AuthDispatch";
import { getRefreshedAccessToken } from "../../Contexts/AuthManagement";
import {
  getAccountTimelinePosts,
  Post as PostContent
} from "../../Utilities/Api/Post";
import styles from "./Home.module.scss";

export const Home = () => {
  const main = useRef<HTMLElement | null>(null);

  return (
    <div className={styles.app}>
      <main className={styles.main} ref={main} id="yoyo">
        <FeedSample />
      </main>
    </div>
  );
};

const getKey = (article: PostContent) => {
  return article.id;
};

const FeedSample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostContent[]>([]);
  const authState = useContext(AuthContext);
  const dispatch = useContext(AuthDispatch);
  const activeAccount = getActiveAccount(authState);

  useEffect(() => {
    getRefreshedAccessToken(activeAccount!, dispatch)
      .then((accessToken) => getAccountTimelinePosts(accessToken.accessToken))
      .then((posts) => {
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [activeAccount, dispatch]);

  return (
    <Feed
      articles={posts}
      getKey={getKey}
      idPrefix="feed"
      isLoadingInitialArticles={isLoading}
      labelId=""
      renderArticle={Post}
    />
  );
};
