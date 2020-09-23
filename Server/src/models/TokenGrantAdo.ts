export interface ClientCredentials {
  client_id?: string;
  client_secret?: string;
}

export interface TokenGrantAuthorizationCodeAdo extends ClientCredentials {
  code: string;
  grant_type: "authorization_code";
  redirect_uri: string;
}

export interface TokenGrantPasswordAdo extends ClientCredentials {
  grant_type: "password";
  password: string;
  scope?: string;
  username: string;
}

export interface TokenGrantRefreshTokenAdo extends ClientCredentials {
  grant_type: "refresh_token";
  refresh_token: string;
  scope?: string;
}

export type TokenGrantAdo =
  | TokenGrantAuthorizationCodeAdo
  | TokenGrantPasswordAdo
  | TokenGrantRefreshTokenAdo;
