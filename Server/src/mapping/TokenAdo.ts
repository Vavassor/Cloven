import { TokenAdo } from "../models/TokenAdo";

export const getTokenAdo = (
  accessToken: string,
  expiresIn: number
): TokenAdo => {
  return {
    access_token: accessToken,
    expires_in: expiresIn,
    token_type: "bearer",
  };
};
