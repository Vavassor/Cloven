import { parse } from "uri-js";

export const isUri = (value: any): boolean => {
  if (typeof value !== "string") {
    throw new Error("The type is invalid.");
  }
  const result = parse(value);
  return !result.error;
};
