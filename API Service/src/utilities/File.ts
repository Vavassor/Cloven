import { readFile } from "fs";

export const readTextFile = async (path: string) => {
  return new Promise<string>((resolve, reject) => {
    readFile(path, { encoding: "utf-8" }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
