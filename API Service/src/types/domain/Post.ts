import { Account } from "./Account";

export interface Post {
  account: Account;
  content: string;
  creationDate: string;
  id: string;
  title: string;
}
