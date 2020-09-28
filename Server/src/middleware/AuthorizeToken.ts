import { RequestHandler, Response as ExpressResponse } from "express";
import { TFunction } from "i18next";
import { join } from "path";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import { englishT, pathRoot } from "../server";
import { HttpStatus } from "../types/HttpStatus";
import { isPastTimestamp } from "../utilities/Date";
import { readTextFile } from "../utilities/File";
import { getAuthorizationField } from "../utilities/Header";
import { verifyAccessToken } from "../utilities/Token";

const respondWithFailure = (
  response: ExpressResponse,
  englishT: TFunction,
  t: TFunction,
  status: HttpStatus,
  error: string,
  errorKey: string
) => {
  const wwwAuthenticate = [
    "Bearer",
    `error=${error}`,
    `error_description=${englishT(errorKey)}`,
  ].join(", ");

  response
    .status(status)
    .header("WWW-Authenticate", wwwAuthenticate)
    .json(getErrorAdoFromMessage(t(errorKey)));
};

const respondWithInvalidRequest = (
  response: ExpressResponse,
  englishT: TFunction,
  t: TFunction
) => {
  respondWithFailure(
    response,
    englishT,
    t,
    HttpStatus.BadRequest,
    "invalid_request",
    "token.invalid_request_error_description"
  );
};

const respondWithInvalidToken = (
  response: ExpressResponse,
  englishT: TFunction,
  t: TFunction
) => {
  respondWithFailure(
    response,
    englishT,
    t,
    HttpStatus.Unauthorized,
    "invalid_token",
    "token.invalid_token_error_description"
  );
};

export const authorizeToken: RequestHandler = async (
  request,
  response,
  next
) => {
  const authorization = request.header("Authorization");
  if (!authorization) {
    return respondWithInvalidRequest(response, englishT, request.t);
  }

  const authorizationField = getAuthorizationField(authorization);
  if (!authorizationField) {
    return respondWithInvalidRequest(response, englishT, request.t);
  }
  if (authorizationField.type !== "Bearer") {
    return respondWithInvalidRequest(response, englishT, request.t);
  }

  const { token } = authorizationField;
  const privateKey = await readTextFile(join(pathRoot, "../jwtRS256.key"));
  const jwtPayload = await verifyAccessToken(token, privateKey);

  if (isPastTimestamp(jwtPayload.exp)) {
    return respondWithInvalidToken(response, englishT, request.t);
  }

  // @TODO Check that scopes are allowed.

  next();
};
