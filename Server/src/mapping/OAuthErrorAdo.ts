import { ValidationError } from "express-validator";
import { TFunction } from "i18next";
import { OAuthErrorAdo, OAuthErrorType } from "../models/OAuthErrorAdo";

interface InfoByErrorType {
  [key: string]: {
    i18nKey: string;
    uri?: string;
  };
}

const infoByErrorType: InfoByErrorType = {
  access_denied: {
    i18nKey: "token.access_denied_error_description",
  },
  invalid_client: {
    i18nKey: "token.invalid_client_error_description",
  },
  invalid_grant: {
    i18nKey: "token.invalid_grant_error_description",
  },
  invalid_request: {
    i18nKey: "token.invalid_request_error_description",
  },
  invalid_scope: {
    i18nKey: "token.invalid_scope_error_description",
  },
  server_error: {
    i18nKey: "token.server_error_error_description",
  },
  temporarily_unavailable: {
    i18nKey: "token.temporarily_unavailable_error_description",
  },
  unauthorized_client: {
    i18nKey: "token.unauthorized_client_error_description",
  },
  unsupported_grant_type: {
    i18nKey: "token.unsupported_grant_type_error_description",
  },
};

export const getOAuthErrorAdo = (
  errorType: OAuthErrorType,
  englishT: TFunction,
  t: TFunction,
  overrideI18nKey?: string
): OAuthErrorAdo => {
  const info = infoByErrorType[errorType];
  const i18nKey = overrideI18nKey || info.i18nKey;

  return {
    error: errorType,
    error_description: englishT(i18nKey),
    error_description_localized: t(i18nKey),
    error_uri: info.uri,
  };
};

const getDescriptionFromErrorArray = (
  errors: ValidationError[],
  t: TFunction
) => {
  return errors
    .map((error) =>
      [
        error.msg,
        t("validation.invalid_parameter_error", {
          context: error.location,
          parameter: error.param,
        }),
      ].join(". ")
    )
    .join(" ");
};

export const getOAuthErrorAdoFromValidationErrorArray = (
  errors: ValidationError[],
  englishT: TFunction,
  t: TFunction
): OAuthErrorAdo => {
  return {
    error: OAuthErrorType.InvalidRequest,
    error_description: getDescriptionFromErrorArray(errors, englishT),
    error_description_localized: getDescriptionFromErrorArray(errors, t),
  };
};
