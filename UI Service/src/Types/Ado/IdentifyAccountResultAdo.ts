import { RecoveryMethodType } from "../RecoveryMethodType";
import { IdAdo } from "./IdAdo";

interface RecoveryMethodEmail {
  email: string;
  id: string;
  type: RecoveryMethodType.Email;
}

type RecoveryMethodAdo = RecoveryMethodEmail;

export interface IdentifyAccountResultAdo {
  id: IdAdo;
  recovery_methods: RecoveryMethodAdo[];
}
