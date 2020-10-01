import { RefreshToken } from "../../types/domain/RefreshToken";

export const getRefreshTokenFromDocument = (
  refreshTokenDocument: any
): RefreshToken => {
  const { account_id, client_id, _id } = refreshTokenDocument;
  return {
    accountId: account_id,
    clientId: client_id,
    id: _id.toString(),
  };
};
