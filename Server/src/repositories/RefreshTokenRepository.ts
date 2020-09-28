import { getRefreshTokenFromDocument } from "../mapping/domain/RefreshToken";
import { RefreshToken } from "../models";
import { RefreshTokenSpec } from "../types/domain/RefreshTokenSpec";

export const createRefreshToken = async (spec: RefreshTokenSpec) => {
  const { accountId, clientId } = spec;
  const refreshTokenDocument = await RefreshToken.create({
    account_id: accountId,
    client_id: clientId,
  });
  return getRefreshTokenFromDocument(refreshTokenDocument.toObject());
};

export const findRefreshTokenById = async (refreshToken: string) => {
  const refreshTokenDocument = await RefreshToken.findById(refreshToken);
  return getRefreshTokenFromDocument(refreshTokenDocument);
};
