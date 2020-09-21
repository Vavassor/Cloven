import { RequestHandler } from "express";
import { QuerySelector } from "mongodb";
import mongoose from "mongoose";
import path from "path";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import { getPostAdo } from "../mapping/PostAdo";
import { getPostFromPostSpecAdo } from "../mapping/PostSpecAdo";
import { Post } from "../models";
import { ErrorAdo } from "../models/ErrorAdo";
import { PostAdo } from "../models/PostAdo";
import { PostSpecAdo } from "../models/PostSpecAdo";
import { urlRoot } from "../server";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";

export const DEFAULT_SEARCH_RESULT_COUNT = 100;

interface GetQuery extends ParsedQs {
  ids: string;
}

interface SearchRecentQuery extends ParsedQs {
  limit?: string;
  since_id?: string;
  until_id?: string;
}

interface LinkEntityHeader {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
}

const getIdLimits = (posts: mongoose.Document[]) => {
  if (posts.length > 0) {
    return {
      sinceId: posts[0]._id,
      untilId: posts[posts.length - 1]._id,
    };
  }
  return null;
};

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

const getLinkEntityHeader = (
  url: string,
  sinceId?: string | null,
  untilId?: string | null
) => {
  const absoluteUrl = path.join(urlRoot, url);
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

const getQueryInt = (
  value: string | undefined,
  defaultValue: number
): number => {
  if (value) {
    const parsedValue = parseInt(value);
    return Number.isNaN(parsedValue) ? defaultValue : parsedValue;
  }
  return defaultValue;
};

const getQuerySelector = (
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

export const createPost: RequestHandler<
  ParamsDictionary,
  PostAdo | ErrorAdo,
  PostSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  try {
    const post = await Post.create(getPostFromPostSpecAdo(request.body));
    response.json(getPostAdo(post));
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  try {
    await Post.deleteOne({ _id: request.params.id });
    response.status(HttpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

export const getPostById: RequestHandler<
  ParamsDictionary,
  PostAdo | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      response
        .status(HttpStatus.NOT_FOUND)
        .json(getErrorAdoFromMessage(request.t("post.id_not_found_error")));
    } else {
      response.json(getPostAdo(post));
    }
  } catch (error) {
    next(error);
  }
};

export const getPosts: RequestHandler<
  ParamsDictionary,
  PostAdo[] | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  const query = request.query as GetQuery;
  const ids = query.ids.split(",");

  try {
    const posts = await Post.find({
      _id: ids,
    });
    response.json(posts.map(getPostAdo));
  } catch (error) {
    next(error);
  }
};

export const searchRecent: RequestHandler<
  ParamsDictionary,
  PostAdo[] | ErrorAdo,
  any,
  SearchRecentQuery
> = async (request, response, next) => {
  const limit = getQueryInt(request.query.limit, DEFAULT_SEARCH_RESULT_COUNT);
  const idQuery = getQuerySelector(
    request.query.since_id,
    request.query.until_id
  );
  const conditions = idQuery ? { _id: idQuery } : {};

  try {
    const posts = await Post.find(conditions, undefined, {
      sort: "-creation_time",
    }).limit(limit);

    const idLimits = getIdLimits(posts);
    if (idLimits) {
      const { sinceId, untilId } = idLimits;
      response.links(
        getLinkEntityHeader(request.originalUrl, sinceId, untilId)
      );
    }

    response.json(posts.map(getPostAdo));
  } catch (error) {
    next(error);
  }
};
