import { createContext } from "react";
import { LayoutDirection, Theme, ThemeType } from "../Types/Theme";

export interface ThemeState {
  theme: Theme;
}

export interface LayoutDirectionAction {
  layoutDirection: LayoutDirection;
  type: "LAYOUT_DIRECTION";
}

export interface ThemeChangeAction {
  theme: ThemeType;
  type: "THEME_CHANGE";
}

export type ThemeAction = LayoutDirectionAction | ThemeChangeAction;

const theme: Theme = {
  layoutDirection: LayoutDirection.LTR,
  type: "LIGHT",
};

export const initialThemeState: ThemeState = {
  theme,
};

export const ThemeContext = createContext(initialThemeState);

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case "LAYOUT_DIRECTION":
      return {
        ...state,
        theme: {
          ...state.theme,
          layoutDirection: action.layoutDirection,
        },
      };
    case "THEME_CHANGE":
      return {
        ...state,
        theme: {
          ...state.theme,
          type: action.theme,
        },
      };
  }
};
