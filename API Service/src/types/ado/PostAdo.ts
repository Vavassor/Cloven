import { AccountPublicAdo } from "./AccountPublicAdo";

export interface PostAdo {
  account: AccountPublicAdo;
  content: string;
  creation_date: string;
  id: string;
  title: string;
}
