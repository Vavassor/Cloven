import { RecoveryMethodType } from "../RecoveryMethodType";
import { IdAdo } from "./IdAdo";

interface TokenByEmail {
  id: string;
  type: RecoveryMethodType.Email;
}

type RecoveryMethod = TokenByEmail;

export interface SendPasswordResetAdo {
  id: IdAdo;
  recovery_method: RecoveryMethod;
}
