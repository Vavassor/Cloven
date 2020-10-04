/// <reference types="jest" />

import { isScopeList } from "../OAuth";

describe("OAuth", () => {
  describe("isScopeList", () => {
    test("an undefined value should throw an exception", () => {
      expect(() => isScopeList(undefined)).toThrow();
    });

    test("a non-string value should throw an exception", () => {
      expect(() => isScopeList({ value: "a" })).toThrow();
    });

    test("a string with leading spaces should return false", () => {
      expect(isScopeList("  read:post")).toBe(false);
    });

    test("a string with trailing spaces should return false", () => {
      expect(isScopeList("read:post    ")).toBe(false);
    });

    test("a string with multiple consecutive spaces should return false", () => {
      expect(isScopeList("offline_access   read:post")).toBe(false);
    });

    test("a string with invalid characters should return false", () => {
      expect(isScopeList("read:😊 write:post")).toBe(false);
    });

    test("a string with valid characters should return true", () => {
      expect(isScopeList("offline_access write:post")).toBe(true);
    });
  });
});
