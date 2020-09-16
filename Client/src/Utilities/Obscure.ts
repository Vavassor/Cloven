const replaceAllExcept = (
  value: string,
  replacement: string,
  exception: string
): string => {
  let newValue = "";
  for (const character of value) {
    newValue += exception === character ? exception : replacement;
  }
  return newValue;
};

export const obscureEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  const localPartShownChars = 2;
  const domainShownChars = 1;
  return [
    localPart
      .substring(0, localPartShownChars)
      .concat("*".repeat(localPart.length - localPartShownChars)),
    domain
      .substring(0, domainShownChars)
      .concat(replaceAllExcept(domain, "*", ".")),
  ].join("@");
};
