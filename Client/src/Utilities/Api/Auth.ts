import { callApi } from "./Api";

interface AccessToken {
  accessToken: string;
  expiresIn: number;
}

interface AccessTokenAdo {
  access_token: string;
  expires_in: number;
}

export const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID!;

const getAccessTokenFromAccessTokenAdo = (
  accessTokenAdo: AccessTokenAdo
): AccessToken => {
  const { access_token, expires_in } = accessTokenAdo;
  return {
    accessToken: access_token,
    expiresIn: expires_in,
  };
};

const isAccessTokenAdo = (
  accessTokenAdo: any
): accessTokenAdo is AccessTokenAdo => {
  return (
    typeof accessTokenAdo === "object" &&
    accessTokenAdo.access_token !== undefined
  );
};

export const exchangePassword = async (username: string, password: string) => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set("client_id", clientId);
  urlSearchParams.set("grant_type", "password");
  urlSearchParams.set("password", password);
  urlSearchParams.set("username", username);

  const accessTokenAdo = await callApi("auth/password", {
    method: "POST",
    urlSearchParams,
  });

  if (!isAccessTokenAdo(accessTokenAdo)) {
    throw new Error(
      "The response body was not the expected type 'AccessTokenAdo'."
    );
  }

  return getAccessTokenFromAccessTokenAdo(accessTokenAdo);
};
