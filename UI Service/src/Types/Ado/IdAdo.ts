import { IdType } from "../IdType";

interface EmailId {
  email: string;
  type: IdType.Email;
}

interface UsernameId {
  username: string;
  type: IdType.Username;
}

export type IdAdo = EmailId | UsernameId;
