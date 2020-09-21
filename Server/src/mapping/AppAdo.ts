import { Document as MongooseDocument } from "mongoose";
import { AppAdo } from "../models/AppAdo";

export const getAppAdo = (
  app: MongooseDocument,
  clientSecret: string
): AppAdo => {
  const { clientId, _id, name, redirectUri, website } = app.toObject();
  return {
    client_id: clientId,
    client_secret: clientSecret,
    name,
    redirect_uri: redirectUri,
    id: _id.toString(),
    website,
  };
};
