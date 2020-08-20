export enum LayoutDirection {
  /** left-to-right */
  LTR,
  /** right-to-left */
  RTL,
}

export interface Theme {
  layoutDirection: LayoutDirection;
}
