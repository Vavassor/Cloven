import { IdType } from "../IdType";

interface ResultEmail {
  email: string;
  type: IdType.Email;
}

type Result = ResultEmail;

interface EmailId {
  email: string;
  type: IdType.Email;
}

interface UsernameId {
  username: string;
  type: IdType.Username;
}

type Id = EmailId | UsernameId;

export interface PasswordResetResult {
  id: Id;
  results: Result[];
}
