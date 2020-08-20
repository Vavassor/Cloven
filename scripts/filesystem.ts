import * as fs from "fs";

export const createDirectory = async (directory: string) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(directory, { recursive: true }, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};

export const readTextFile = async (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

export const readJsonFile = async (path: string) => {
  const content = await readTextFile(path);
  return JSON.parse(content);
};

const writeTextFile = async (path: string, content: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, "utf8", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const writeJsonFile = async (
  path: string,
  content: object | number | string
) => {
  const json = JSON.stringify(content, null, 2);
  return writeTextFile(path, json);
};
