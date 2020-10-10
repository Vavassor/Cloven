import { IdType } from "../IdType";
import { IdAdo } from "./IdAdo";

interface SideChannelEmail {
  email: string;
  id: string;
  type: IdType.Email;
}

export type SideChannel = SideChannelEmail;

export interface PasswordResetResultAdo {
  id: IdAdo;
  results: SideChannel[];
}
