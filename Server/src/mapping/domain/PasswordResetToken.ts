import { PasswordResetToken } from "../../types/domain/PasswordResetToken";

export const getPasswordResetTokenFromDocument = (
  document: any
): PasswordResetToken => {
  const { account_id, expiration_date, token } = document;
  return {
    accountId: account_id,
    expirationDate: expiration_date,
    token,
  };
};
