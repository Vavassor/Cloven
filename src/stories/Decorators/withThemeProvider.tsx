import { Story } from "@storybook/react/types-6-0";
import React from "react";
import { initialThemeState, ThemeContext } from "../../Contexts/ThemeContext";

export const withThemeProvider = (Story: Story) => (
  <ThemeContext.Provider value={initialThemeState}>
    <Story />
  </ThemeContext.Provider>
);
