import { RequestHandler } from "express";
import { getOAuthErrorAdo } from "../mapping/OAuthErrorAdo";
import { findAppByClientId } from "../repositories/AppRepository";
import { englishT } from "../server";
import { OAuthErrorAdo, OAuthErrorType } from "../types/ado/OAuthErrorAdo";
import { TokenAdo } from "../types/ado/TokenAdo";
import { TokenGrantAdo } from "../types/ado/TokenGrantAdo";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { getAuthorizationField } from "../utilities/Header";
import { compareHash } from "../utilities/Password";

export const authenticateClient: RequestHandler<
  ParamsDictionary,
  TokenAdo | OAuthErrorAdo,
  TokenGrantAdo,
  ParsedQs
> = async (request, response, next) => {
  let clientId = undefined;
  let clientSecret = undefined;

  const authorization = request.header("Authorization");
  if (authorization) {
    const authorizationField = getAuthorizationField(authorization);
    switch (authorizationField?.type) {
      case "Basic": {
        const { username, password } = authorizationField;
        clientId = username;
        clientSecret = password;
        break;
      }

      default:
        return response
          .status(HttpStatus.Unauthorized)
          .header("WWW-Authenticate", "Basic")
          .json(
            getOAuthErrorAdo(
              OAuthErrorType.InvalidClient,
              englishT,
              request.t,
              "token.unsupported_authentication_method_error_description"
            )
          );
    }
  }

  clientId = clientId || request.body.client_id;
  clientSecret = clientSecret || request.body.client_secret;

  if (clientId && clientSecret) {
    const app = await findAppByClientId(clientId);
    if (!app) {
      return response
        .status(HttpStatus.Unauthorized)
        .json(
          getOAuthErrorAdo(OAuthErrorType.InvalidClient, englishT, request.t)
        );
    }

    const { client_secret: clientSecretHash } = app.toObject();
    const isSecretMatch = await compareHash(clientSecret, clientSecretHash);
    if (!isSecretMatch) {
      return response
        .status(HttpStatus.Unauthorized)
        .json(
          getOAuthErrorAdo(OAuthErrorType.InvalidClient, englishT, request.t)
        );
    }
  }

  // @TODO Check if the grant type is allowed for the given client. In
  // particular, if a third-party client attempts to use the resource owner
  // password grant type.

  request.clientId = clientId;

  next();
};
