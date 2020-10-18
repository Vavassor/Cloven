import { RequestHandler, Response as ExpressResponse } from "express";
import { TFunction } from "i18next";
import { getErrorAdoFromMessage } from "../mapping/ErrorAdo";
import { findAccountById } from "../repositories/AccountRepository";
import { config, englishT } from "../server";
import { HttpStatus } from "../types/HttpStatus";
import { escapeQuotes } from "../utilities/Ascii";
import { getPrivateKey } from "../utilities/Config";
import { getAuthorizationField } from "../utilities/Header";
import { comparePartialDoubleHash } from "../utilities/Password";
import {
  JwtPayload,
  PasswordResetTokenPayload,
  verifyAccessToken,
  verifyPasswordResetToken,
} from "../utilities/Token";

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
    `error="${error}"`,
    `error_description="${escapeQuotes(englishT(errorKey))}"`,
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

export const authorizePasswordResetToken: RequestHandler = async (
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
  const privateKey = await getPrivateKey(config);

  let jwtPayload: PasswordResetTokenPayload;
  try {
    jwtPayload = await verifyPasswordResetToken(token, privateKey);
  } catch (error) {
    return respondWithInvalidToken(response, englishT, request.t);
  }

  const accountId = jwtPayload.sub;

  const account = await findAccountById(accountId);
  if (!account) {
    return respondWithInvalidRequest(response, englishT, request.t);
  }

  const isTokenUnused = await comparePartialDoubleHash(
    account.password,
    jwtPayload.token
  );
  if (!isTokenUnused) {
    return respondWithInvalidRequest(response, englishT, request.t);
  }

  request.accountId = accountId;

  next();
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
  const privateKey = await getPrivateKey(config);

  let jwtPayload: JwtPayload;
  try {
    jwtPayload = await verifyAccessToken(token, privateKey);
  } catch (error) {
    return respondWithInvalidToken(response, englishT, request.t);
  }

  // @TODO Check that scopes are allowed.

  next();
};
