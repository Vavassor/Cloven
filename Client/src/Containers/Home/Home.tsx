import React, { useContext, useEffect, useRef, useState } from "react";
import { Feed } from "../../Components/Feed/Feed";
import { Post } from "../../Components/Post";
import { AuthContext, getActiveAccount } from "../../Contexts/AuthContext";
import {
  getUserTimelinePosts,
  Post as PostContent,
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
  const activeAccount = getActiveAccount(authState);

  useEffect(() => {
    getUserTimelinePosts(activeAccount!.accessToken.accessToken)
      .then((posts) => {
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [activeAccount!.accessToken]);

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
