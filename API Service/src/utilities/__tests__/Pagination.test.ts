/// <reference types="jest" />

import { getQueryInt } from "../Pagination";

describe("Pagination", () => {
  describe("getQueryInt", () => {
    test("a valid integer should be parsed as expected", () => {
      expect(getQueryInt("-300", 1)).toBe(-300);
      expect(getQueryInt("0", 1)).toBe(0);
      expect(getQueryInt("2e53", 1)).toBe(2e53);
    });

    test("a non-integer number should return the default value", () => {
      expect(getQueryInt("0.789", 1)).toBe(1);
      expect(getQueryInt("Infinity", 1)).toBe(1);
    });

    test("an undefined string should return the default value", () => {
      expect(getQueryInt(undefined, 1)).toBe(1);
    });

    test("an invalid string should return the default value", () => {
      expect(getQueryInt("b", 1)).toBe(1);
    });

    test("an empty string should return the default value", () => {
      expect(getQueryInt("", 1)).toBe(1);
    });
  });
});
