import { TFunction } from "i18next";
import * as Yup from "yup";

export const MAX_CHARS_PASSWORD = 64;
export const MAX_CHARS_USERNAME = 16;
export const MIN_CHARS_PASSWORD = 4;
export const MIN_CHARS_USERNAME = 4;

interface TextFieldErrorKeys {
  maxLengthError: string;
  minLengthError: string;
  requiredError: string;
}

export const getPasswordValidator = (
  t: TFunction,
  errorKeys: TextFieldErrorKeys
) => {
  return Yup.string()
    .max(
      MAX_CHARS_PASSWORD,
      t(errorKeys.maxLengthError, { count: MAX_CHARS_PASSWORD })
    )
    .min(
      MIN_CHARS_PASSWORD,
      t(errorKeys.minLengthError, { count: MIN_CHARS_PASSWORD })
    )
    .required(t(errorKeys.requiredError))
    .trim();
};

export const getUsernameValidator = (
  t: TFunction,
  errorKeys: TextFieldErrorKeys
) => {
  return Yup.string()
    .trim()
    .max(
      MAX_CHARS_USERNAME,
      t(errorKeys.maxLengthError, { count: MAX_CHARS_USERNAME })
    )
    .min(
      MIN_CHARS_USERNAME,
      t(errorKeys.minLengthError, { count: MIN_CHARS_USERNAME })
    )
    .required(t(errorKeys.requiredError));
};
