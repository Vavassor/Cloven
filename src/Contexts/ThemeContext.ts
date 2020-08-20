import { createContext } from "react";
import { LayoutDirection, Theme } from "../Types/Theme";

export interface ThemeState {
  theme: Theme;
}

export interface LayoutDirectionAction {
  layoutDirection: LayoutDirection;
  type: "LAYOUT_DIRECTION";
}

export type ThemeAction = LayoutDirectionAction;

const theme: Theme = {
  layoutDirection: LayoutDirection.LTR,
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
    default:
      throw new Error(
        `Invalid 'ThemeAction' dispatched with type ${action.type}.`
      );
  }
};
