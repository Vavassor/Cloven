import { PasswordResetResultAdo } from "../types/ado/PasswordResetResultAdo";
import { IdType } from "../types/IdType";

export const getPasswordResetResultAdoFromEmail = (
  email: string,
  obscuredEmail: string
): PasswordResetResultAdo => {
  return {
    id: { email, type: IdType.Email },
    results: [
      {
        email: obscuredEmail,
        type: IdType.Email,
      },
    ],
  };
};

export const getPasswordResetResultAdoFromUsername = (
  username: string,
  obscuredEmail: string
): PasswordResetResultAdo => {
  return {
    id: { username, type: IdType.Username },
    results: [
      {
        email: obscuredEmail,
        type: IdType.Email,
      },
    ],
  };
};
