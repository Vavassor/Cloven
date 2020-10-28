import { IdType } from "../IdType";
import { RecoveryMethodType } from "../RecoveryMethodType";

interface RecoveryMethodEmail {
  email: string;
  id: string;
  type: RecoveryMethodType.Email;
}

export type RecoveryMethod = RecoveryMethodEmail;

interface EmailId {
  email: string;
  type: IdType.Email;
}

interface UsernameId {
  username: string;
  type: IdType.Username;
}

export type Id = EmailId | UsernameId;

export interface IdentifyAccountResult {
  id: Id;
  recoveryMethods: RecoveryMethod[];
}
