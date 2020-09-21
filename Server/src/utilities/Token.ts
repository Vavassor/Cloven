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

export const generateToken = async (
  accountAdo: AccountAdo,
  expiresIn: number,
  privateKey: string,
  apiUrl: string
) => {
  const { id, ...payload } = accountAdo;
  const jwt = await signJwt(payload, privateKey, {
    audience: apiUrl,
    expiresIn,
    issuer: apiUrl,
    subject: id,
  });
  return jwt;
};
