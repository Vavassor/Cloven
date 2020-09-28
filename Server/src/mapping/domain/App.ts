import { App } from "../../types/domain/App";

export const getAppFromDocument = (appDocument: any): App => {
  const {
    client_id,
    client_secret,
    _id,
    name,
    redirect_uri,
    website,
  } = appDocument;
  return {
    clientId: client_id,
    clientSecret: client_secret,
    id: _id.toString(),
    name,
    redirectUri: redirect_uri,
    website,
  };
};
