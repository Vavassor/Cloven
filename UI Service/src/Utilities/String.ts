export const joinPath = (...parts: string[]) => {
  return parts
    .map((part) => {
      let newPart = part;
      if (newPart.startsWith("/")) {
        newPart = newPart.slice(1);
      }
      if (newPart.endsWith("/")) {
        newPart = newPart.slice(-1);
      }
      return newPart;
    })
    .join("/");
};

export const toKebabCase = (value: string) => {
  return value.toLowerCase().replace(" ", "-");
};
