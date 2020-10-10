import { SideChannelType } from "../SideChannelType";
import { IdAdo } from "./IdAdo";

interface TokenByEmail {
  id: string;
  type: SideChannelType.Email;
}

type SideChannel = TokenByEmail;

export interface SendPasswordResetAdo {
  id: IdAdo;
  side_channel: SideChannel;
}
