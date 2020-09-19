import i18next from "i18next";
import React from "react";
import { Post as PostContent } from "../../Utilities/Api/Post";
import { formatTimeAgo } from "../../Utilities/Date";
import { RenderArticleProps } from "../Feed";

export interface PostProps extends RenderArticleProps<PostContent> {}

const getTime = (date: Date, locale: string) => {
  const relativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    style: "long",
  });
  return formatTimeAgo(date, relativeTimeFormat);
};

const formatDate = (date: Date, locale: string) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    month: "long",
    second: "numeric",
    year: "numeric",
  });
  return dateTimeFormat.format(date);
};

export const Post: React.FC<PostProps> = ({ article }) => {
  const locale = i18next.language;

  return (
    <>
      <p>{article.title}</p>
      <time
        dateTime={article.creationTime.toISOString()}
        title={formatDate(article.creationTime, locale)}
      >
        {getTime(article.creationTime, locale)}
      </time>
    </>
  );
};
