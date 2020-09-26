export const validateCharCodes = (
  value: string,
  isValid: (charCode: number) => boolean
) => {
  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    if (!isValid(charCode)) {
      return false;
    }
  }
  return true;
};
