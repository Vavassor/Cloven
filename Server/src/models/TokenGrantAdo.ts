export interface TokenGrantCodeAdo {
  grant_type: "code";
}

export interface TokenGrantPasswordAdo {
  client_id: string;
  grant_type: "password";
  password: string;
  username: string;
}

export type TokenGrantAdo = TokenGrantCodeAdo | TokenGrantPasswordAdo;
