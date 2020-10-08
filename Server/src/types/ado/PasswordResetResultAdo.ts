import { IdType } from "../IdType";

interface ResultEmail {
  email: string;
  type: IdType.Email;
}

export type PasswordResetResult = ResultEmail;

interface EmailId {
  email: string;
  type: IdType.Email;
}

interface UsernameId {
  username: string;
  type: IdType.Username;
}

type Id = EmailId | UsernameId;

export interface PasswordResetResultAdo {
  id: Id;
  results: PasswordResetResult[];
}
