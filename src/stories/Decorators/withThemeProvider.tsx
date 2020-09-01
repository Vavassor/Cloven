import { Story, StoryContext } from "@storybook/react/types-6-0";
import React, { useContext, useEffect } from "react";
import { ThemeContext, ThemeState } from "../../Contexts/ThemeContext";
import { LayoutDirection, ThemeType } from "../../Types/Theme";
import { useThemeSetup } from "../../Utilities/Hooks/useThemeSetup";

const getThemeState = (
  layoutDirection: LayoutDirection,
  type: ThemeType
): ThemeState => {
  return {
    theme: {
      layoutDirection,
      type,
    },
  };
};

const Wrapper: React.FC<{}> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const { layoutDirection } = theme;
  useThemeSetup();

  useEffect(() => {
    const { documentElement } = document;
    documentElement.dir =
      layoutDirection === LayoutDirection.RTL ? "rtl" : "ltr";
  }, [layoutDirection]);

  return <>{children}</>;
};

export function withThemeProvider(Story: Story, context: StoryContext) {
  const themeState = getThemeState(
    context.globals.layoutDirection,
    context.globals.themeType
  );
  return (
    <ThemeContext.Provider value={themeState}>
      <Wrapper>
        <Story />
      </Wrapper>
    </ThemeContext.Provider>
  );
}
