import { getPasswordResetTokenFromDocument } from "../mapping/domain/PasswordResetToken";
import { PasswordResetToken as Model } from "../models";
import { PasswordResetToken } from "../types/domain/PasswordResetToken";

export const createPasswordResetToken = async (
  token: string,
  expirationDate: Date,
  accountId: string,
): Promise<PasswordResetToken> => {
  const document = await Model.create({
    account_id: accountId,
    expiration_date: expirationDate,
    token,
  });
  return getPasswordResetTokenFromDocument(document.toObject());
};
