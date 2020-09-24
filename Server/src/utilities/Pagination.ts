import { QuerySelector } from "mongodb";
import { Document as MongooseDocument } from "mongoose";
import { join } from "path";

interface LinkEntityHeader {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}

const stripPaginationQueryParameters = (url: string) => {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.delete("since_id");
  parsedUrl.searchParams.delete("until_id");
  return parsedUrl.toString();
};

const getNextLink = (url: string, sinceId: string) => {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set("since_id", sinceId);
  return parsedUrl.toString();
};

const getPreviousLink = (url: string, untilId: string) => {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set("until_id", untilId);
  return parsedUrl.toString();
};

export const getIdLimits = (posts: MongooseDocument[]) => {
  if (posts.length > 0) {
    return {
      sinceId: posts[0]._id,
      untilId: posts[posts.length - 1]._id,
    };
  }
  return null;
};

export const getLinkEntityHeader = (
  url: string,
  urlRoot: string,
  sinceId?: string | null,
  untilId?: string | null
) => {
  const absoluteUrl = join(urlRoot, url);
  const strippedUrl = stripPaginationQueryParameters(absoluteUrl);

  let linkEntityHeader: LinkEntityHeader = {};
  if (untilId) {
    linkEntityHeader.next = getNextLink(strippedUrl, untilId);
  }
  if (sinceId) {
    linkEntityHeader.prev = getPreviousLink(strippedUrl, sinceId);
  }

  return linkEntityHeader;
};

export const getQueryInt = (
  value: string | undefined,
  defaultValue: number
): number => {
  if (value) {
    const numberValue = Number(value);
    return !Number.isInteger(numberValue) ? defaultValue : numberValue;
  }
  return defaultValue;
};

export const getQuerySelector = (
  sinceId?: string,
  untilId?: string
): QuerySelector<string> | null => {
  if (!sinceId && !untilId) {
    return null;
  }

  let idQuery: QuerySelector<string> = {};
  if (sinceId) {
    idQuery.$gt = sinceId;
  }
  if (untilId) {
    idQuery.$lt = untilId;
  }

  return idQuery;
};
