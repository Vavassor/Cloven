import React, { forwardRef, HTMLAttributes, KeyboardEventHandler } from "react";
import styles from "./FeedArticle.module.scss";

interface FeedArticleProps extends HTMLAttributes<HTMLElement> {
  labelId: string;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  positionInSet: number;
  setSize: number;
}

export const FeedArticle = forwardRef<HTMLElement, FeedArticleProps>(
  (
    { children, labelId, onKeyDown, positionInSet, setSize, ...otherProps },
    ref
  ) => {
    return (
      <article
        aria-labelledby={labelId}
        aria-posinset={positionInSet}
        aria-setsize={setSize}
        className={styles.article}
        onKeyDown={onKeyDown}
        ref={ref}
        tabIndex={0}
        {...otherProps}
      >
        {children}
      </article>
    );
  }
);
