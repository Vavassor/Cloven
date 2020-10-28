import { header } from "express-validator";
import { isAlphanumericChar } from "../utilities/Ascii";
import { validateCharCodes } from "./String";

const isBearerField = (value: any): boolean => {
  if (typeof value !== "string") {
    return false;
  }
  const parts = value.split(" ");
  if (parts.length !== 2) {
    return false;
  }
  return parts[0] === "Bearer" && isBearerCredentials(parts[1]);
};

/** @see https://tools.ietf.org/html/rfc6750#section-2.1 */
const isBearerCredientialChar = (codepoint: number): boolean => {
  return (
    isAlphanumericChar(codepoint) ||
    codepoint === 0x2b ||
    (codepoint >= 0x2d && codepoint <= 0x2f) ||
    codepoint === 0x3d ||
    codepoint === 0x5f ||
    codepoint === 0x7e
  );
};

const isBearerCredentials = (value: string): boolean => {
  return validateCharCodes(value, isBearerCredientialChar);
};

export const validateAuthorizationHeader = [
  header("Authorization").exists().custom(isBearerField),
];
