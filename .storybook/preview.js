import "../src/Sass/main.scss";
import { withSuspense } from "../src/stories/Decorators/withSuspense";
import { withThemeProvider } from "../src/stories/Decorators/withThemeProvider";
import { LayoutDirection } from "../src/Types/Theme";
import "../src/Utilities/I18n";

export const decorators = [withSuspense, withThemeProvider];

export const globalTypes = {
  layoutDirection: {
    name: "Layout Direction",
    description: "Layout and writing direction",
    defaultValue: LayoutDirection.LTR,
    toolbar: {
      icon: "transfer",
      items: [
        { title: "Left to right", value: LayoutDirection.LTR },
        { title: "Right to left", value: LayoutDirection.RTL },
      ],
    },
  },
  themeType: {
    name: "Theme Type",
    description: "Theme type",
    defaultValue: "LIGHT",
    toolbar: {
      icon: "circle",
      items: [
        { title: "Dark", value: "DARK" },
        { title: "Light", value: "LIGHT" },
      ],
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^(handle|on)[A-Z].*" },
};
