import { IdentifyAccountResultAdo } from "../types/ado/IdentifyAccountResultAdo";
import { IdType } from "../types/IdType";
import { RecoveryMethodType } from "../types/RecoveryMethodType";

export const getIdentifyAccountResultAdoFromEmail = (
  email: string,
  obscuredEmail: string,
  id: string
): IdentifyAccountResultAdo => {
  return {
    id: { email, type: IdType.Email },
    recovery_methods: [
      {
        email: obscuredEmail,
        id,
        type: RecoveryMethodType.Email,
      },
    ],
  };
};

export const getIdentifyAccountResultAdoFromUsername = (
  username: string,
  obscuredEmail: string,
  id: string
): IdentifyAccountResultAdo => {
  return {
    id: { username, type: IdType.Username },
    recovery_methods: [
      {
        email: obscuredEmail,
        id,
        type: RecoveryMethodType.Email,
      },
    ],
  };
};
