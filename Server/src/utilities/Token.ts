import { randomBytes } from "crypto";
import jwt, { SignOptions } from "jsonwebtoken";
import { AccountAdo } from "../models/AccountAdo";

const signJwt = (
  payload: object,
  privateKey: string,
  signOptions?: SignOptions
) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      privateKey,
      { algorithm: "RS256", ...signOptions },
      (error, encoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(encoded);
        }
      }
    );
  });
};

export const createAccessToken = async (
  accountAdo: AccountAdo,
  expiresIn: number,
  privateKey: string,
  apiUrl: string,
  jwtid: string,
  scopes?: string[]
) => {
  const { id, ...accountPayload } = accountAdo;
  const payload = { ...accountPayload, scopes };
  const jwt = await signJwt(payload, privateKey, {
    audience: apiUrl,
    expiresIn,
    issuer: apiUrl,
    subject: id,
    jwtid,
  });
  return jwt;
};

export const createRefreshToken = () => {
  return randomBytes(32).toString("base64");
};
