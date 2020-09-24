import { randomBytes } from "crypto";

export const getRandomBase64 = (size: number) => {
  return randomBytes(size).toString("base64");
};
