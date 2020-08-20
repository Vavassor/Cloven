import "../src/Sass/main.scss";
import { withSuspense } from "../src/stories/Decorators/withSuspense";
import { withThemeProvider } from "../src/stories/Decorators/withThemeProvider";
import "../src/Utilities/I18n";

export const parameters = {
  actions: { argTypesRegex: "^(handle|on)[A-Z].*" },
};

export const decorators = [withSuspense, withThemeProvider];
