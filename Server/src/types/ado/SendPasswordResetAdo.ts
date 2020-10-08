import { IdType } from "../IdType";

interface ResetByEmail {
  email: string;
  type: IdType.Email;
}

interface ResetByUsername {
  username: string;
  type: IdType.Username;
}

export type SendPasswordResetAdo = ResetByEmail | ResetByUsername;
