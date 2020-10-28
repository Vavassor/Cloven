import {
  NextFunction,
  Request as ExpressRequest,
  RequestHandler,
  Response as ExpressResponse,
} from "express";
import { ParamsDictionary, ParsedQs } from "../types/express";

export function asyncHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
>(handler: RequestHandler<P, ResBody, ReqBody, ReqQuery>) {
  return (
    request: ExpressRequest<P, ResBody, ReqBody, ReqQuery>,
    response: ExpressResponse<ResBody>,
    next: NextFunction
  ) => {
    return Promise.resolve(handler(request, response, next)).catch(next);
  };
}
