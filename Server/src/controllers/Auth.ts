import { randomBytes } from "crypto";
import { RequestHandler } from "express";
import { join } from "path";
import { getAccountAdo } from "../mapping/AccountAdo";
import { getOAuthErrorAdo } from "../mapping/OAuthErrorAdo";
import { getTokenAdo } from "../mapping/TokenAdo";
import { Account } from "../models/Account";
import { OAuthErrorAdo, OAuthErrorType } from "../models/OAuthErrorAdo";
import { TokenAdo } from "../models/TokenAdo";
import { TokenGrantAdo } from "../models/TokenGrantAdo";
import { englishT, pathRoot, urlRoot } from "../server";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { Scope } from "../types/Scope";
import { readTextFile } from "../utilities/File";
import { compareHash, hash } from "../utilities/Password";
import { createAccessToken, createRefreshToken } from "../utilities/Token";

const parseScopes = (scopes?: string) => {
  const array = scopes?.split(" ");
  return array && array.length > 0 ? array : undefined;
};

export const grantToken: RequestHandler<
  ParamsDictionary,
  TokenAdo | OAuthErrorAdo,
  TokenGrantAdo,
  ParsedQs
> = async (request, response, next) => {
  response.header("Cache-Control", "no-store");
  response.header("Pragma", "no-cache");

  switch (request.body.grant_type) {
    case "password": {
      const scopes = parseScopes(request.body.scope);

      const account = await Account.findOne({
        username: request.body.username,
      });
      if (!account) {
        return response
          .status(HttpStatus.BadRequest)
          .json(
            getOAuthErrorAdo(OAuthErrorType.InvalidGrant, englishT, request.t)
          );
      }

      const { password } = account.toObject();
      const isPasswordMatch = await compareHash(
        request.body.password,
        password
      );
      if (!isPasswordMatch) {
        return response
          .status(HttpStatus.BadRequest)
          .json(
            getOAuthErrorAdo(OAuthErrorType.InvalidGrant, englishT, request.t)
          );
      }

      // @TODO Check that scopes are allowed.

      const expiresIn = 3600;
      const privateKey = await readTextFile(join(pathRoot, "../jwtRS256.key"));
      const jwtid = randomBytes(32).toString("base64");
      const accessToken = await createAccessToken(
        getAccountAdo(account),
        expiresIn,
        privateKey,
        urlRoot,
        jwtid,
        scopes
      );

      const refreshToken = scopes?.includes(Scope.OfflineAccess)
        ? createRefreshToken()
        : undefined;

      response.json(getTokenAdo(accessToken, expiresIn, refreshToken));
      break;
    }

    default: {
      return response
        .status(HttpStatus.BadRequest)
        .json(
          getOAuthErrorAdo(
            OAuthErrorType.UnsupportedResponseType,
            englishT,
            request.t
          )
        );
    }
  }

  next();
};
