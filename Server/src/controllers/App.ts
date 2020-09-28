import { RequestHandler } from "express";
import { v5 as uuidv5 } from "uuid";
import { getAppAdoFromApp } from "../mapping/AppAdo";
import { getAppSpecFromAppSpecAdo } from "../mapping/domain/AppSpec";
import * as AppRepository from "../repositories/AppRepository";
import { AppAdo } from "../types/ado/AppAdo";
import { AppSpecAdo } from "../types/ado/AppSpecAdo";
import { ErrorAdo } from "../types/ado/ErrorAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { hash } from "../utilities/Password";
import { getRandomBase64 } from "../utilities/Random";

export const createApp: RequestHandler<
  ParamsDictionary,
  AppAdo | ErrorAdo,
  AppSpecAdo,
  ParsedQs
> = async (request, response, next) => {
  const appSpec = getAppSpecFromAppSpecAdo(request.body);
  const clientId = uuidv5(appSpec.website, uuidv5.URL);
  const clientSecret = getRandomBase64(32);
  const hashedClientSecret = await hash(clientSecret);
  const app = await AppRepository.createApp(
    appSpec,
    clientId,
    hashedClientSecret
  );
  response.json(getAppAdoFromApp(app, clientSecret));
};
