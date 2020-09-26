import { getDateInSeconds } from "../Date";
import { callApi } from "./Api";

export interface AccessToken {
  accessToken: string;
  expirationDate: Date;
  refreshToken?: string;
}

interface TokenAdo {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  token_type: string;
}

interface TokenGrantAdo {
  client_id: string;
  grant_type: "password";
  password: string;
  scope?: string;
  username: string;
}

export interface Userinfo {
  accountId: string;
}

interface UserinfoAdo {
  sub: string;
}

export const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID!;

const getAccessTokenFromTokenAdo = (tokenAdo: TokenAdo): AccessToken => {
  const { access_token, expires_in, refresh_token } = tokenAdo;
  return {
    accessToken: access_token,
    expirationDate: getDateInSeconds(expires_in),
    refreshToken: refresh_token,
  };
};

const getUserinfoFromUserinfoAdo = (userinfoAdo: UserinfoAdo): Userinfo => {
  const { sub } = userinfoAdo;
  return {
    accountId: sub,
  };
};

const isTokenAdo = (tokenAdo: any): tokenAdo is TokenAdo => {
  return typeof tokenAdo === "object" && tokenAdo.access_token !== undefined;
};

const isUserinfoAdo = (userinfoAdo: any): userinfoAdo is UserinfoAdo => {
  return typeof userinfoAdo === "object" && userinfoAdo.sub !== undefined;
};

export const exchangePassword = async (username: string, password: string) => {
  const tokenGrantAdo: TokenGrantAdo = {
    client_id: clientId,
    grant_type: "password",
    password,
    scope: "offline_access",
    username,
  };

  const tokenAdo = await callApi("auth/token", {
    method: "POST",
    body: tokenGrantAdo,
  });

  if (!isTokenAdo(tokenAdo)) {
    throw new Error(
      "The response body was not the expected type 'AccessTokenAdo'."
    );
  }

  return getAccessTokenFromTokenAdo(tokenAdo);
};

export const getUserinfo = async (accessToken: AccessToken) => {
  const userinfoAdo = await callApi("auth/userinfo", {
    headers: { Authorization: `Bearer ${accessToken.accessToken}` },
    method: "GET",
  });

  if (!isUserinfoAdo(userinfoAdo)) {
    throw new Error(
      "The response body was not the expected type 'UserinfoAdo'."
    );
  }

  return getUserinfoFromUserinfoAdo(userinfoAdo);
};
