import { getAppFromDocument } from "../mapping/domain/App";
import { App as AppModel } from "../models";
import { AppSpec } from "../types/domain/AppSpec";

export const createApp = async (
  spec: AppSpec,
  clientId: string,
  clientSecret: string
) => {
  const { name, redirectUri, website } = spec;
  const appDocument = await AppModel.create({
    client_id: clientId,
    client_secret: clientSecret,
    name,
    redirect_uri: redirectUri,
    website,
  });
  return getAppFromDocument(appDocument.toObject());
};

export const findAppByClientId = async (clientId: string) => {
  return AppModel.findOne({ client_id: clientId });
};
