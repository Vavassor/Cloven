import React, {
  HTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import { Key } from "../../Types/Key";
import { FeedArticle } from "./FeedArticle";

export interface RenderArticleProps<T> {
  article: T;
  labelId: string;
}

export interface FeedProps<T> {
  articleProps?: HTMLAttributes<HTMLElement>;
  articles: T[];
  elementBeforeFeed?: HTMLElement | null;
  elementAfterFeed?: HTMLElement | null;
  getKey: (article: T) => string;
  idPrefix: string;
  isLoadingInitialArticles?: boolean;
  labelId: string;
  renderArticle: (props: RenderArticleProps<T>) => ReactNode;
}

export function Feed<T>({
  articleProps,
  articles,
  elementBeforeFeed,
  elementAfterFeed,
  getKey,
  idPrefix,
  isLoadingInitialArticles,
  labelId,
  renderArticle,
}: FeedProps<T>) {
  const articlesByKey = useRef<Map<string, HTMLElement>>(new Map());

  const focusArticle = (article: T) => {
    const key = getKey(article);
    const element = articlesByKey.current.get(key);
    element?.focus();
  };

  const handleArticleRef = (instance: HTMLElement | null, key: string) => {
    if (instance) {
      articlesByKey.current.set(key, instance);
    }
  };

  const handleArticleKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    switch (event.key) {
      case Key.End:
        if (event.ctrlKey) {
          elementAfterFeed?.focus();
        }
        break;

      case Key.Home:
        if (event.ctrlKey) {
          elementBeforeFeed?.focus();
        }
        break;

      case Key.PageDown:
        event.preventDefault();
        const nextIndex = Math.min(index + 1, articles.length - 1);
        focusArticle(articles[nextIndex]);
        break;

      case Key.PageUp:
        event.preventDefault();
        const priorIndex = Math.max(index - 1, 0);
        focusArticle(articles[priorIndex]);
        break;
    }
  };

  useLayoutEffect(() => {
    const currentArticlesByKey = articlesByKey.current;
    return () => {
      currentArticlesByKey.clear();
    };
  }, [articles]);

  return (
    <div
      aria-busy={isLoadingInitialArticles}
      aria-labelledby={labelId}
      role="feed"
    >
      {articles.map((article, index) => {
        const key = getKey(article);
        const labelId = `${idPrefix}-${key}-label`;

        const handleKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
          handleArticleKeyDown(event, index);
        };

        const handleRef = (instance: HTMLElement | null) => {
          handleArticleRef(instance, key);
        };

        return (
          <FeedArticle
            key={key}
            labelId={labelId}
            onKeyDown={handleKeyDown}
            positionInSet={index + 1}
            ref={handleRef}
            setSize={articles.length}
            {...articleProps}
          >
            {renderArticle({ article, labelId })}
          </FeedArticle>
        );
      })}
    </div>
  );
}
