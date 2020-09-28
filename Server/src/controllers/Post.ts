import { RequestHandler } from "express";
import { getPostSpecFromPostSpecAdo } from "../mapping/domain/PostSpec";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import { getPostAdoFromPost } from "../mapping/PostAdo";
import * as PostRepository from "../repositories/PostRepository";
import { urlRoot } from "../server";
import { ErrorAdo } from "../types/ado/ErrorAdo";
import { PostAdo } from "../types/ado/PostAdo";
import { PostSpecAdo } from "../types/ado/PostSpecAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import {
  getIdLimits,
  getLinkEntityHeader,
  getQueryInt,
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
  const post = await PostRepository.createPost(
    getPostSpecFromPostSpecAdo(request.body)
  );
  response.json(getPostAdoFromPost(post));
};

export const deletePost: RequestHandler<
  ParamsDictionary,
  ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  await PostRepository.deletePost(request.params.id);
  response.status(HttpStatus.NoContent).end();
};

export const getPostById: RequestHandler<
  ParamsDictionary,
  PostAdo | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  const post = await PostRepository.findPostById(request.params.id);
  if (!post) {
    return response
      .status(HttpStatus.NotFound)
      .json(getErrorAdoFromMessage(request.t("post.id_not_found_error")));
  }
  response.json(getPostAdoFromPost(post));
};

export const getPosts: RequestHandler<
  ParamsDictionary,
  PostAdo[] | ErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  const query = request.query as GetQuery;
  const ids = query.ids.split(",");
  const posts = await PostRepository.findPostsById(ids);
  response.json(posts.map(getPostAdoFromPost));
};

export const searchRecent: RequestHandler<
  ParamsDictionary,
  PostAdo[] | ErrorAdo,
  any,
  SearchRecentQuery
> = async (request, response, next) => {
  const limit = getQueryInt(request.query.limit, DEFAULT_SEARCH_RESULT_COUNT);
  const posts = await PostRepository.findRecentPosts(
    request.query.since_id,
    request.query.until_id,
    limit
  );

  const idLimits = getIdLimits(posts);
  if (idLimits) {
    const { sinceId, untilId } = idLimits;
    response.links(
      getLinkEntityHeader(request.originalUrl, urlRoot, sinceId, untilId)
    );
  }

  response.json(posts.map(getPostAdoFromPost));
};
