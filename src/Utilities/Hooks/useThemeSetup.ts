import { useContext, useEffect } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

export const useThemeSetup = () => {
  const { theme } = useContext(ThemeContext);
  const { type: themeType } = theme;

  useEffect(() => {
    const documentElement = document.documentElement;
    documentElement.dataset.themeType = themeType;
  }, [themeType]);
};
