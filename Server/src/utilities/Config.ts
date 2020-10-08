import { join } from "path";
import { readTextFile } from "./File";

export interface Config {
  fileRoot: string;
  privateKey?: string;
  urlRoot: string;
}

export const getPrivateKey = async (config: Config): Promise<string> => {
  if (!config.privateKey) {
    config.privateKey = await readTextFile(
      join(config.fileRoot, "../jwtRS256.key")
    );
  }
  return config.privateKey;
};
