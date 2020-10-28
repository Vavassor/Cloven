import { RequestHandler, Response as ExpressResponse } from "express";
import { TFunction } from "i18next";
import { getOAuthErrorAdo } from "../mapping/OAuthErrorAdo";
import { getTokenAdo } from "../mapping/TokenAdo";
import { getUserinfoAdoFromJwtPayload } from "../mapping/UserinfoAdo";
import {
  findAccountById,
  findAccountByUsername,
} from "../repositories/AccountRepository";
import {
  createRefreshToken,
  findRefreshTokenById,
} from "../repositories/RefreshTokenRepository";
import { config, englishT } from "../server";
import { OAuthErrorAdo, OAuthErrorType } from "../types/ado/OAuthErrorAdo";
import { TokenAdo } from "../types/ado/TokenAdo";
import {
  TokenGrantAdo,
  TokenGrantPasswordAdo,
  TokenGrantRefreshTokenAdo,
} from "../types/ado/TokenGrantAdo";
import { UserinfoAdo } from "../types/ado/UserinfoAdo";
import { Account } from "../types/domain/Account";
import { ParamsDictionary, ParsedQs } from "../types/express";
import { HttpStatus } from "../types/HttpStatus";
import { Scope } from "../types/Scope";
import { getPrivateKey } from "../utilities/Config";
import { parseScopes } from "../utilities/Parse";
import { compareHash } from "../utilities/Password";
import { getRandomBase64 } from "../utilities/Random";
import { createAccessToken, verifyAccessToken } from "../utilities/Token";

const getAccessToken = async (account: Account, scopes?: string[]) => {
  const expiresIn = 3600;
  const privateKey = await getPrivateKey(config);
  const jwtid = getRandomBase64(32);
  const accessToken = await createAccessToken(
    account,
    expiresIn,
    privateKey,
    config.urlRoot,
    jwtid,
    scopes
  );
  return { accessToken, expiresIn };
};

const exchangePassword = async (
  body: TokenGrantPasswordAdo,
  t: TFunction,
  clientId: string,
  response: ExpressResponse<TokenAdo | OAuthErrorAdo>
) => {
  const account = await findAccountByUsername(body.username);
  if (!account) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, englishT, t));
  }

  const { password } = account;
  const isPasswordMatch = await compareHash(body.password, password);
  if (!isPasswordMatch) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, englishT, t));
  }

  // @TODO Check that scopes are allowed.

  const scopes = parseScopes(body.scope);
  const { accessToken, expiresIn } = await getAccessToken(account, scopes);

  let refreshToken: string | undefined;
  if (scopes?.includes(Scope.OfflineAccess)) {
    const refreshTokenInfo = await createRefreshToken({
      accountId: account.id,
      clientId,
    });
    refreshToken = refreshTokenInfo.id;
  }

  response.json(getTokenAdo(accessToken, expiresIn, refreshToken));
};

const exchangeRefreshToken = async (
  body: TokenGrantRefreshTokenAdo,
  t: TFunction,
  response: ExpressResponse<TokenAdo | OAuthErrorAdo>
) => {
  const refreshToken = await findRefreshTokenById(body.refresh_token);
  if (!refreshToken) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, englishT, t));
  }

  const account = await findAccountById(refreshToken.accountId);
  if (!account) {
    return response
      .status(HttpStatus.BadRequest)
      .json(getOAuthErrorAdo(OAuthErrorType.InvalidGrant, englishT, t));
  }

  const scopes = parseScopes(body.scope);
  const { accessToken, expiresIn } = await getAccessToken(account, scopes);

  response.json(getTokenAdo(accessToken, expiresIn));
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
    case "password":
      await exchangePassword(
        request.body,
        request.t,
        request.clientId!,
        response
      );
      break;

    case "refresh_token":
      await exchangeRefreshToken(request.body, request.t, response);
      break;

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
};

export const getUserinfo: RequestHandler<
  ParamsDictionary,
  UserinfoAdo | OAuthErrorAdo,
  any,
  ParsedQs
> = async (request, response, next) => {
  const { authorization } = request.headers;
  const credentials = authorization?.split(" ")[1];
  if (!credentials) {
    throw new Error("Expected authorization header field.");
  }
  const privateKey = await getPrivateKey(config);
  const payload = await verifyAccessToken(credentials, privateKey);
  response.json(getUserinfoAdoFromJwtPayload(payload));
};
