export const fillTemplate = (
  template: string,
  dictionary: Record<string, string>
): string => {
  let result = "";

  for (let charIndex = 0; charIndex < template.length; ) {
    const percentIndex = template.indexOf("%", charIndex);

    if (percentIndex === -1) {
      result += template.slice(charIndex);
      break;
    }

    result += template.slice(charIndex, percentIndex);

    const keyStart = percentIndex + 1;
    const keyEnd = template.indexOf("%", keyStart);

    if (keyEnd === -1) {
      throw new Error("Percent sign was mismatched in the HTML template.");
    }

    const key = template.slice(keyStart, keyEnd).trim();
    const value = dictionary[key];

    if (!value) {
      throw new Error(`Key ${key} wasn't found in the dictionary.`);
    }

    result += value;
    charIndex = keyEnd + 1;
  }

  return result;
};
