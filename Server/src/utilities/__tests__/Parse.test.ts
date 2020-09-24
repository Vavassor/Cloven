/// <reference types="jest" />

import { parseScopes } from "../Parse";

describe("Parse", () => {
  describe("getScopes", () => {
    test("an valid string should return an array of scopes", () => {
      expect(parseScopes("offline_access read:post")).toEqual([
        "offline_access",
        "read:post",
      ]);
    });

    test("an empty string should return undefined", () => {
      expect(parseScopes("")).toBeUndefined();
    });

    test("an undefined string should return undefined", () => {
      expect(parseScopes(undefined)).toBeUndefined();
    });
  });
});
