import { RequestHandler } from "express";
import { getOAuthErrorAdo } from "../mapping/OAuthErrorAdo";
import { App } from "../models/App";
import { OAuthErrorAdo, OAuthErrorType } from "../models/OAuthErrorAdo";
import { TokenAdo } from "../models/TokenAdo";
import { TokenGrantAdo } from "../models/TokenGrantAdo";
import { englishT } from "../server";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { compareHash } from "../utilities/Password";

const getCredentialsBasic = (base64Credentials: string) => {
  const asciiCredentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = asciiCredentials.split(":");
  return { username, password };
};

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
    const [type, credentials] = authorization.split(" ");
    if (type === "Basic") {
      const { username, password } = getCredentialsBasic(credentials);
      clientId = username;
      clientSecret = password;
    } else {
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
    const app = await App.findOne({ client_id: clientId });
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

  next();
};
