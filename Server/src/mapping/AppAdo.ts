import { Document as MongooseDocument } from "mongoose";
import { App } from "../types/domain/App";
import { AppAdo } from "../types/ado/AppAdo";

export const getAppAdoFromApp = (
  app: App, clientSecret: string
): AppAdo => {
  const { clientId, id, name, redirectUri, website } = app;
  return {
    client_id: clientId,
    client_secret: clientSecret,
    name,
    redirect_uri: redirectUri,
    id,
    website,
  };
};
