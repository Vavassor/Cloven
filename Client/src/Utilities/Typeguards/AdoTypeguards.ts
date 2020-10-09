import { AccountAdo } from "../../Types/Ado/AccountAdo";
import { PasswordResetResultAdo } from "../../Types/Ado/PasswordResetResultAdo";

export const isAccountAdo = (account: any): account is AccountAdo => {
  return typeof account === "object" && account.username !== undefined;
};

export const isPasswordResetResultAdo = (
  value: any
): value is PasswordResetResultAdo => {
  return typeof value === "object";
};
