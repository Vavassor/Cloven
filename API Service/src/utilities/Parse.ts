export const parseScopes = (scopes?: string) => {
  if (scopes === "") {
    return undefined;
  }
  const array = scopes?.split(" ");
  return array && array.length > 0 ? array : undefined;
};
