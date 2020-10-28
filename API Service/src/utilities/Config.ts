import dotenv from "dotenv";
import { dirname, join } from "path";
import { readTextFile } from "./File";

const defaults = {
  mongodbUri: "mongodb://localhost:27017/cloven",
  port: "3001",
  urlRoot: "http://localhost"
};

export enum Environment {
  Development = "development",
  Production = "production",
}

export interface Config {
  environment: Environment;
  fileRoot: string;
  mongodbUri: string;
  port: number;
  privateKey?: string;
  urlRoot: string;
}

const isEnvironment = (value: any): value is Environment => {
  const values = Object.values(Environment) as string[];
  return typeof value === "string" && values.includes(value);
};

const getEnvironment = (value?: string) => {
  if (isEnvironment(value)) {
    return value;
  }
  return Environment.Production;
};

const loadEnvironmentVariable = (key: string, defaultValue = ""): string => {
  const value = process.env[key];
  const isVariableRequired = !defaultValue;
  if (isVariableRequired && value === undefined) {
    console.warn(
      `Environment variable '${key}' was not set. Is it in the .env file?`
    );
  }
  return value || defaultValue;
};

/**
 * Loads the private key on-demand from file and caches it to return for
 * subsequent runs.
 */
export const getPrivateKey = async (config: Config): Promise<string> => {
  if (!config.privateKey) {
    config.privateKey = await readTextFile(
      join(config.fileRoot, "../jwtRS256.key")
    );
  }
  return config.privateKey;
};

export const loadConfig = (): Config => {
  dotenv.config();

  const environment = getEnvironment(process.env.NODE_ENV);
  const fileRoot = dirname(__dirname);
  const mongodbUri = loadEnvironmentVariable(
    "MONGODB_URI",
    defaults.mongodbUri
  );
  const port = parseInt(loadEnvironmentVariable("PORT", defaults.port));
  const urlRootWithoutPort = loadEnvironmentVariable("URL_ROOT", defaults.urlRoot);
  const urlRoot = `${urlRootWithoutPort}:${port}`;

  const config: Config = {
    environment,
    fileRoot,
    mongodbUri,
    port,
    urlRoot,
  };

  return config;
};
