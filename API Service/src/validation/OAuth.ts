import { validateCharCodes } from "./String";

export const MAX_CHARS_PASSWORD = 64;
export const MAX_CHARS_USERNAME = 16;
export const MIN_CHARS_PASSWORD = 4;
export const MIN_CHARS_USERNAME = 4;

/**
 * Determine whether a codepoint is a valid XML character, excluding
 * line feed U+000A and carriage return U+000D.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#charsets
 */
const isXmlCharacter = (codepoint: number): boolean => {
  return (
    codepoint === 0x09 ||
    (codepoint >= 0x20 && codepoint <= 0x7e) ||
    (codepoint >= 0x80 && codepoint <= 0xd7ff) ||
    (codepoint >= 0xe000 && codepoint <= 0xfffd) ||
    (codepoint >= 0x10000 && codepoint <= 0x10ffff)
  );
};

/**
 * Determine whether a code is a non-quote visible ASCII character.
 * Also, excludes backslash.
 */
const isNQChar = (charCode: number): boolean => {
  return (
    charCode === 0x21 ||
    (charCode >= 0x23 && charCode <= 0x5b) ||
    (charCode >= 0x5d && charCode <= 0x7e)
  );
};

/**
 * Determine whether a character is a non-quote visible ASCII character, or a
 * space. Also, excludes backslash.
 */
const isNQSChar = (charCode: number): boolean => {
  return charCode === 0x20 || isNQChar(charCode);
};

/** Determine whether a character is a visible ASCII character. */
const isVSChar = (charCode: number): boolean => {
  return charCode >= 0x20 && charCode <= 0x7e;
};

const hasConsecutiveSpaces = (value: string): boolean => {
  return value.match(/ {2}/) !== null;
};

const hasSpacesAtEitherEnd = (value: string): boolean => {
  return value.charAt(0) === " " || value.charAt(value.length - 1) === " ";
};

const expectString = (value: any): string => {
  if (typeof value !== "string") {
    throw new Error("The type is invalid.");
  }
  return value;
};

export const isPassword = (value: any): boolean => {
  const password = expectString(value);
  return validateCharCodes(password, isXmlCharacter);
};

export const isScopeList = (value: any): boolean => {
  const scopes = expectString(value);

  return (
    !hasConsecutiveSpaces(scopes) &&
    !hasSpacesAtEitherEnd(scopes) &&
    validateCharCodes(scopes, isNQSChar)
  );
};

export const isUsername = (value: any): boolean => {
  const username = expectString(value);
  return validateCharCodes(username, isXmlCharacter);
};

export const isVisibleString = (value: any): boolean => {
  const refreshToken = expectString(value);
  return validateCharCodes(refreshToken, isVSChar);
};
