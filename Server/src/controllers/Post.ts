import { RequestHandler } from "express";
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
import {
  getIdLimits,
  getLinkEntityHeader,
  getQueryInt,
  getQuerySelector,
} from "../utilities/Pagination";

interface GetQuery extends ParsedQs {
  ids: string;
}

interface SearchRecentQuery extends ParsedQs {
  limit?: string;
  since_id?: string;
  until_id?: string;
}

export const DEFAULT_SEARCH_RESULT_COUNT = 100;

export const createPost: RequestHandler<
  ParamsDictionary,
  PostAdo | ErrorAdo,
  PostSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const post = await Post.create(getPostFromPostSpecAdo(request.body));
  response.json(getPostAdo(post));
};

export const deletePost: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  await Post.deleteOne({ _id: request.params.id });
  response.status(HttpStatus.NoContent).end();
};

export const getPostById: RequestHandler<
  ParamsDictionary,
  PostAdo | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  const post = await Post.findById(request.params.id);
  if (!post) {
    response
      .status(HttpStatus.NotFound)
      .json(getErrorAdoFromMessage(request.t("post.id_not_found_error")));
  } else {
    response.json(getPostAdo(post));
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
  const posts = await Post.find({
    _id: ids,
  });
  response.json(posts.map(getPostAdo));
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

  const posts = await Post.find(conditions, undefined, {
    sort: "-creation_time",
  }).limit(limit);

  const idLimits = getIdLimits(posts);
  if (idLimits) {
    const { sinceId, untilId } = idLimits;
    response.links(
      getLinkEntityHeader(request.originalUrl, urlRoot, sinceId, untilId)
    );
  }

  response.json(posts.map(getPostAdo));
};
