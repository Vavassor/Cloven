import { RequestHandler } from "express";
import { TokenGrantAdo } from "../models/TokenGrantAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { conditionalMiddleWare } from "../utilities/ConditionalMiddleware";

export const enableCors: RequestHandler = (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

export const forNonPasswordGrants = conditionalMiddleWare<
  ParamsDictionary,
  any,
  TokenGrantAdo,
  ParsedQs
>((request) => {
  return request.body.grant_type !== "password";
});
