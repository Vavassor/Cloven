import { createContext, Dispatch } from "react";
import { LayoutDirection } from "../Types/Theme";
import { ThemeAction } from "./ThemeContext";

const noop = () => {};

export const ThemeDispatch = createContext<Dispatch<ThemeAction>>(noop);

export const setLayoutDirection = (
  layoutDirection: LayoutDirection
): ThemeAction => {
  return {
    layoutDirection,
    type: "LAYOUT_DIRECTION",
  };
};
