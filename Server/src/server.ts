import DeviceDetector from "device-detector-js";
import express from "express";
import i18next from "i18next";
import FilesystemBackend from "i18next-fs-backend";
import i18nextHttpMiddleware from "i18next-http-middleware";
import mongoose from "mongoose";
import { join } from "path";
import { getErrorAdoFromErrorSingle } from "./mapping/ErrorAdo";
import { router as routes } from "./routes";
import { loadConfig } from "./utilities/Config";
import { createTransporter } from "./utilities/Email";
import { logError } from "./utilities/Logging";

process.on("uncaughtException", (error) => {
  logError("An uncaught exception occurred.", error);
});

export const config = loadConfig();

i18next
  .use(FilesystemBackend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: join(config.fileRoot, "../locales/{{lng}}/{{ns}}.json"),
    },
    detection: {
      caches: false,
      ignoreCase: false,
      lookupHeader: "accept-language",
    },
    fallbackLng: "en",
    preload: ["en"],
  });

export const englishT = i18next.getFixedT("en");
export const emailTransporter = createTransporter();
export const deviceDetector = new DeviceDetector();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(i18nextHttpMiddleware.handle(i18next));
app.use(express.static(join(config.fileRoot, "../../Client/build")));

app.use(routes);

app.get("*", (request, response, next) => {
  response.sendFile(join(config.fileRoot, "../../Client/build/index.html"));
});

app.use((request, response, next) => {
  if (request.accepts("html")) {
    response.status(404);
    next();
  } else if (request.accepts("json")) {
    response.status(404).json(
      getErrorAdoFromErrorSingle({
        details: request.t("page_not_found.api_error_details"),
        message: request.t("page_not_found.api_error_message"),
      })
    );
  } else {
    response.status(406).end();
  }
});

mongoose
  .connect(config.mongodbUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    logError("Failed to connect to MongoDB.", error);
  });

app.listen(config.port);
