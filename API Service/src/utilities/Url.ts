export const addQueryParameters = (
  url: string,
  parameters: Record<string, string>
): string => {
  const urlSearchParams = new URLSearchParams();
  for (const parameterName in parameters) {
    urlSearchParams.set(parameterName, parameters[parameterName]);
  }
  return `${url}?${urlSearchParams.toString()}`;
};
