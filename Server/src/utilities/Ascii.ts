/**
 * American Standard Code for Information Interchange (ASCII) is a character
 * encoding standard.
 */

export const isAlphabeticChar = (codepoint: number): boolean => {
  return (
    (codepoint >= 0x41 && codepoint <= 0x5a) ||
    (codepoint >= 0x61 && codepoint <= 0x7a)
  );
};

export const isAlphanumericChar = (codepoint: number): boolean => {
  return isAlphabeticChar(codepoint) || isNumericChar(codepoint);
};

export const isNumericChar = (codepoint: number): boolean => {
  return codepoint >= 0x30 && codepoint <= 0x39;
};
