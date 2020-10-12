export const addQueryParameters = (
  url: string,
  parameters: Record<string, string>
) => {
  const urlSearchParams = new URLSearchParams();
  for (const parameterName in parameters) {
    urlSearchParams.set(parameterName, parameters[parameterName]);
  }
  return `${url}?${urlSearchParams.toString()}`;
};

export const getQueryParameters = (
  queryString: string
): Record<string, string> => {
  const urlSearchParams = new URLSearchParams(queryString);
  return Object.fromEntries(urlSearchParams.entries());
};
