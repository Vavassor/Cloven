import { joinPath } from "../String";
import { isErrorAdo } from "./Error";

export const apiRoot = process.env.REACT_APP_API_ROOT!;

interface CallApiOptions {
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

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
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

  return response.json();
};
