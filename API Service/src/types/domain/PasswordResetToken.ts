export interface PasswordResetToken {
  accountId: string;
  expirationDate: Date;
  token: string;
}
