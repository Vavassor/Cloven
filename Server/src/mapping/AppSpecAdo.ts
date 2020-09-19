import { CreateQuery, Document as MongooseDocument } from "mongoose";
import { v5 as uuidv5 } from "uuid";
import { AppSpecAdo } from "../models/AppSpecAdo";
import { hash } from "../utilities/Password";

export const getCreateQueryFromAppSpecAdo = async (
  appSpecAdo: AppSpecAdo,
  clientSecret: string
) => {
  const { name, redirect_uri, website } = appSpecAdo;
  const clientId = uuidv5(appSpecAdo.website, uuidv5.URL);
  const hashedClientSecret = await hash(clientSecret);
  const createQuery: CreateQuery<MongooseDocument> = {
    clientId,
    clientSecret: hashedClientSecret,
    name,
    redirectUri: redirect_uri,
    website,
  };
  return createQuery;
};
