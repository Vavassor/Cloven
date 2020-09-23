import express from "express";
import i18next from "i18next";
import FilesystemBackend from "i18next-fs-backend";
import i18nextHttpMiddleware from "i18next-http-middleware";
import mongoose from "mongoose";
import path from "path";
import { getErrorAdoFromErrorSingle } from "./mapping/ErrorAdo";
import { router as routes } from "./routes";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/cloven";
const PORT = process.env.PORT || 3001;

export const urlRoot = `http://localhost:${PORT}`;
export const pathRoot = __dirname;

i18next
  .use(FilesystemBackend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(pathRoot, "../locales/{{lng}}/{{ns}}.json"),
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

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(i18nextHttpMiddleware.handle(i18next));
app.use(express.static(path.join(pathRoot, "../../Client/build")));

app.use(routes);

app.get("*", (request, response, next) => {
  response.sendFile(path.join(pathRoot, "../../Client/build/index.html"));
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

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT);
