import { RefreshToken } from "../../types/domain/RefreshToken";

export const getRefreshTokenFromDocument = (
  refreshTokenDocument: any
): RefreshToken => {
  const { accountId, clientId, _id } = refreshTokenDocument;
  return {
    accountId,
    clientId,
    id: _id.toString(),
  };
};
