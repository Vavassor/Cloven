import { HttpStatus } from "../../Types/HttpStatus";
import { joinPath } from "../String";
import { isErrorAdo } from "./Error";

export const apiRoot = process.env.REACT_APP_API_ROOT!;

interface CallApiOptions {
  body?: object;
  bearerToken?: string;
  headers?: Record<string, string>;
  method: "DELETE" | "GET" | "PATCH" | "POST";
  urlSearchParams?: URLSearchParams;
}

export const callApi = async (
  endpoint: string,
  options: CallApiOptions
): Promise<any> => {
  let url = joinPath(apiRoot, endpoint);

  if (options.urlSearchParams) {
    url = `${url}?${options.urlSearchParams.toString()}`;
  }

  let body: string | undefined;
  if (options.body) {
    body = JSON.stringify(options.body);
  }

  const authorizationHeader: Record<string, string> = options.bearerToken
    ? { Authorization: `Bearer ${options.bearerToken}` }
    : {};

  const response = await fetch(url, {
    body,
    headers: {
      "Content-Type": "application/json",
      ...authorizationHeader,
      ...options.headers,
    },
    method: options.method,
  });

  if (!response.ok) {
    const json = await response.json();
    if (isErrorAdo(json)) {
      const errorAdo = json;
      throw new Error(errorAdo.errors[0].message);
    }

    throw new Error(
      `API call failed with HTTP status code ${response.status}.`
    );
  }

  if (response.status === HttpStatus.NoContent) {
    return;
  }

  return response.json();
};
