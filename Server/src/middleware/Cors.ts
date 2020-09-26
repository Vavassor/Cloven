/**
 * Cross-Origin Resource Sharing (CORS) is a specification that enables a web app
 * running at one origin to access selected resources from a different origin.
 */
import { RequestHandler, Response as ExpressResponse } from "express";
import { IncomingHttpHeaders } from "http";
import { TokenGrantAdo } from "../models/TokenGrantAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { conditionalMiddleWare } from "../utilities/ConditionalMiddleware";

interface CorsOptions {
  headers?: string[];
  methods?: string;
  origin?: string;
}

interface VaryHeader {
  vary: string[];
}

const defaults: CorsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: "*",
};

const setAllowedHeaders = (
  options: CorsOptions,
  requestHeaders: IncomingHttpHeaders,
  response: ExpressResponse,
  varyHeader: VaryHeader
) => {
  if (options.headers) {
    response.header("Access-Control-Allow-Headers", options.headers.join(","));
  } else {
    response.header(
      "Access-Control-Allow-Headers",
      requestHeaders["access-control-request-headers"]
    );
    varyHeader.vary.push("Access-Control-Request-Headers");
  }
};

const setVary = (varyHeader: VaryHeader, response: ExpressResponse) => {
  if (varyHeader.vary.length > 0) {
    response.header("Vary", varyHeader.vary.join(" "));
  }
};

export const enableCors: RequestHandler = (request, response, next) => {
  const varyHeader: VaryHeader = { vary: [] };

  setAllowedHeaders(defaults, request.headers, response, varyHeader);
  response.header("Access-Control-Allow-Origin", defaults.origin);
  setVary(varyHeader, response);

  next();
};

export const forNonPasswordGrants = conditionalMiddleWare<
  ParamsDictionary,
  any,
  TokenGrantAdo,
  ParsedQs
>((request) => {
  if (process.env.NODE_ENV === "development") {
    // Allow CORS for password grants only when in development.
    return true;
  }
  return request.body.grant_type !== "password";
});

export const handleCorsPreflight: RequestHandler = (
  request,
  response,
  next
) => {
  const varyHeader: VaryHeader = { vary: [] };

  setAllowedHeaders(defaults, request.headers, response, varyHeader);
  response.header("Access-Control-Allow-Origin", defaults.origin);
  response.header("Access-Control-Allow-Methods", defaults.methods);
  setVary(varyHeader, response);

  response.status(HttpStatus.NoContent).header("Content-Length", "0").end();
};
