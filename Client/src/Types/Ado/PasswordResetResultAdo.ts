import { SideChannelType } from "../SideChannelType";
import { IdAdo } from "./IdAdo";

interface SideChannelEmail {
  email: string;
  id: string;
  type: SideChannelType.Email;
}

type SideChannel = SideChannelEmail;

export interface PasswordResetResultAdo {
  id: IdAdo;
  results: SideChannel[];
}
