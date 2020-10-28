import { AppSpecAdo } from "../../types/ado/AppSpecAdo";
import { AppSpec } from "../../types/domain/AppSpec";

export const getAppSpecFromAppSpecAdo = (appSpecAdo: AppSpecAdo): AppSpec => {
  const { name, redirect_uri, website } = appSpecAdo;
  return {
    name,
    redirectUri: redirect_uri,
    website,
  };
};
