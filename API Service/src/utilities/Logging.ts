import { serializeError } from "serialize-error";
import { config } from "../server";
import { Environment } from "../utilities/Config";

export const logError = (message: string, error?: any) => {
  const serialized = serializeError(error);
  const json = JSON.stringify(serialized, null, 2);

  if (config.environment === Environment.Development) {
    console.error(`${message}\nError object, displayed in JSON: ${json}`);
  } else {
    const body = {
      message,
      source_error: serialized,
    };
    // @TODO: Send logs to a service.
  }
};
