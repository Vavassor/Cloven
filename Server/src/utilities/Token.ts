import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { Account } from "../types/domain/Account";

export interface JwtPayload {
  aud: string;
  exp: number;
  iss: string;
  jti: string;
  scope?: string;
  sub: string;
}

const isJwtPayload = (value: any): value is JwtPayload => {
  return (
    typeof value === "object" &&
    typeof value.aud === "string" &&
    typeof value.exp === "number" &&
    typeof value.iss === "string" &&
    typeof value.jti === "string" &&
    (!value.scope || typeof value.scope === "string") &&
    typeof value.sub === "string"
  );
};

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

const verifyJwt = (
  token: string,
  privateKey: string,
  verifyOptions?: VerifyOptions
) => {
  return new Promise<object | undefined>((resolve, reject) => {
    jwt.verify(
      token,
      privateKey,
      { algorithms: ["RS256"], ...verifyOptions },
      (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

export const createAccessToken = async (
  account: Account,
  expiresIn: number,
  privateKey: string,
  apiUrl: string,
  jwtid: string,
  scopes?: string[]
) => {
  const { id, ...accountPayload } = account;
  const payload = { ...accountPayload, scope: scopes?.join(" ") };
  const jwt = await signJwt(payload, privateKey, {
    audience: apiUrl,
    expiresIn,
    issuer: apiUrl,
    jwtid,
    subject: id,
  });
  return jwt;
};

export const verifyAccessToken = async (token: string, privateKey: string) => {
  const verifiedToken = await verifyJwt(token, privateKey);
  if (!verifiedToken) {
    throw new Error("No token decoded when verifying a JWT.");
  }
  if (!isJwtPayload(verifiedToken)) {
    throw new Error("JWT payload format is invalid.");
  }
  return verifiedToken;
};
