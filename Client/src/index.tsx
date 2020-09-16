import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppLoader } from "./Components/AppLoader";
import "./index.css";
import "./Sass/main.scss";
import "./Utilities/I18n";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<AppLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
