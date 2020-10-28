import { TokenAdo } from "../types/ado/TokenAdo";

export const getTokenAdo = (
  accessToken: string,
  expiresIn: number,
  refreshToken?: string,
): TokenAdo => {
  return {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
    token_type: "bearer",
  };
};
