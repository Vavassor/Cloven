import { RequestHandler } from "express";
import { getAppAdo } from "../mapping/AppAdo";
import { getCreateQueryFromAppSpecAdo } from "../mapping/AppSpecAdo";
import { App } from "../models/App";
import { AppAdo } from "../models/AppAdo";
import { AppSpecAdo } from "../models/AppSpecAdo";
import { ErrorAdo } from "../models/ErrorAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { getRandomBase64 } from "../utilities/Random";

export const createApp: RequestHandler<
  ParamsDictionary,
  AppAdo | ErrorAdo,
  AppSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const clientSecret = getRandomBase64(32);
  const createQuery = await getCreateQueryFromAppSpecAdo(
    request.body,
    clientSecret
  );
  const app = await App.create(createQuery);
  response.json(getAppAdo(app, clientSecret));
};
