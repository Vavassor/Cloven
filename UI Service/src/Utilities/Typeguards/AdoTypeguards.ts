import { AccountAdo } from "../../Types/Ado/AccountAdo";
import { IdAdo } from "../../Types/Ado/IdAdo";
import { IdentifyAccountResultAdo } from "../../Types/Ado/IdentifyAccountResultAdo";
import { IdType } from "../../Types/IdType";

export const isAccountAdo = (account: any): account is AccountAdo => {
  return typeof account === "object" && account.username !== undefined;
};

export const isIdAdo = (value: any): value is IdAdo => {
  return (
    typeof value === "object" &&
    ((value.type === IdType.Email && typeof value.email === "string") ||
      (value.type === IdType.Username && typeof value.username === "string"))
  );
};

export const isIdentifyAccountResultAdo = (
  value: any
): value is IdentifyAccountResultAdo => {
  return (
    typeof value === "object" &&
    Array.isArray(value.recovery_methods) &&
    isIdAdo(value.id)
  );
};
