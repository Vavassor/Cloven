import { IdType } from "../IdType";
import { SideChannelType } from "../SideChannelType";

interface SideChannelEmail {
  email: string;
  id: string;
  type: SideChannelType.Email;
}

export type SideChannel = SideChannelEmail;

interface EmailId {
  email: string;
  type: IdType.Email;
}

interface UsernameId {
  username: string;
  type: IdType.Username;
}

export type Id = EmailId | UsernameId;

export interface PasswordResetResult {
  id: Id;
  results: SideChannel[];
}
