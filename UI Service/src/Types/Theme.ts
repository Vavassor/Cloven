export enum LayoutDirection {
  /** left-to-right */
  LTR,
  /** right-to-left */
  RTL,
}

export type ThemeType = "DARK" | "LIGHT";

export interface Theme {
  layoutDirection: LayoutDirection;
  type: ThemeType;
}
