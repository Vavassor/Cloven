import { Story, StoryContext } from "@storybook/react/types-6-0";
import React, { useContext, useEffect } from "react";
import { ThemeContext, ThemeState } from "../../Contexts/ThemeContext";
import { LayoutDirection } from "../../Types/Theme";

const getThemeState = (layoutDirection: LayoutDirection): ThemeState => {
  return {
    theme: {
      layoutDirection,
    },
  };
};

const Wrapper: React.FC<{}> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const { layoutDirection } = theme;

  useEffect(() => {
    const { documentElement } = document;
    documentElement.dir =
      layoutDirection === LayoutDirection.LTR ? "ltr" : "rtl";
  }, [layoutDirection]);

  return <>{children}</>;
};

export function withThemeProvider(Story: Story, context: StoryContext) {
  const themeState = getThemeState(context.globals.layoutDirection);
  return (
    <ThemeContext.Provider value={themeState}>
      <Wrapper>
        <Story />
      </Wrapper>
    </ThemeContext.Provider>
  );
}
