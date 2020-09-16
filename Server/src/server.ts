import express from "express";
import exphbs from "express-handlebars";
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

const app = express();

app.engine("handlebars", exphbs());
app.set("views", path.join(pathRoot, "views"));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(i18nextHttpMiddleware.handle(i18next));

app.use(routes);
app.use((request, response, next) => {
  if (request.accepts("html")) {
    response.status(404).render("not_found", {
      heading: request.t("page_not_found.heading"),
      lang: request.language,
      message: request.t("page_not_found.message"),
      title: request.t("page_not_found.title"),
      url: request.url,
    });
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
