import {
  NextFunction,
  Request as ExpressRequest,
  RequestHandler,
  Response as ExpressResponse,
} from "express";
import { ParamsDictionary, ParsedQs } from "../types/express";

type ConditionFunction<P, ResBody, ReqBody, ReqQuery> = (
  request: ExpressRequest<P, ResBody, ReqBody, ReqQuery>,
  response: ExpressResponse<ResBody>,
  next: NextFunction
) => boolean;

type Condition<P, ResBody, ReqBody, ReqQuery> =
  | boolean
  | ConditionFunction<P, ResBody, ReqBody, ReqQuery>;

export function conditionalMiddleWare<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
>(condition: Condition<P, ResBody, ReqBody, ReqQuery>) {
  return (middleware: RequestHandler<P, ResBody, ReqBody, ReqQuery>) => {
    const wrapper: RequestHandler<P, ResBody, ReqBody, ReqQuery> = (
      request,
      response,
      next
    ) => {
      if (
        (typeof condition == "boolean" && condition) ||
        (typeof condition == "function" && condition(request, response, next))
      ) {
        return middleware(request, response, next);
      }
      next();
    };
    return wrapper;
  };
}
