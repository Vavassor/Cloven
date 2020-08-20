import {
  ClassAttributes,
  createElement,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { joinClassNames } from "./Style";

type ElementProps<T> = ClassAttributes<T> & HTMLAttributes<T>;
type ForwardRefResult<T, P> = ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
>;

export const StyledDiv = (
  ...classNames: string[]
): ForwardRefResult<HTMLDivElement, ElementProps<HTMLDivElement>> => {
  return forwardRef<HTMLDivElement, ElementProps<HTMLDivElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "div",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledH1 = (
  ...classNames: string[]
): ForwardRefResult<HTMLHeadingElement, ElementProps<HTMLHeadingElement>> => {
  return forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "h1",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledH2 = (
  ...classNames: string[]
): ForwardRefResult<HTMLHeadingElement, ElementProps<HTMLHeadingElement>> => {
  return forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "h2",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledH3 = (
  ...classNames: string[]
): ForwardRefResult<HTMLHeadingElement, ElementProps<HTMLHeadingElement>> => {
  return forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "h3",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledH4 = (
  ...classNames: string[]
): ForwardRefResult<HTMLHeadingElement, ElementProps<HTMLHeadingElement>> => {
  return forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "h4",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledH5 = (
  ...classNames: string[]
): ForwardRefResult<HTMLHeadingElement, ElementProps<HTMLHeadingElement>> => {
  return forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "h5",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledH6 = (
  ...classNames: string[]
): ForwardRefResult<HTMLHeadingElement, ElementProps<HTMLHeadingElement>> => {
  return forwardRef<HTMLHeadingElement, ElementProps<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "h6",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledMain = (
  ...classNames: string[]
): ForwardRefResult<HTMLElement, ElementProps<HTMLElement>> => {
  return forwardRef<HTMLElement, ElementProps<HTMLElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "main",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledSection = (
  ...classNames: string[]
): ForwardRefResult<HTMLElement, ElementProps<HTMLElement>> => {
  return forwardRef<HTMLElement, ElementProps<HTMLElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "section",
        {
          className: joinClassNames(...classNames, className),
          ref,
          ...otherProps,
        },
        children
      )
  );
};

export const StyledSpan = (
  ...classNames: string[]
): ForwardRefResult<HTMLSpanElement, ElementProps<HTMLSpanElement>> => {
  return forwardRef<HTMLSpanElement, ElementProps<HTMLSpanElement>>(
    ({ children, className, ...otherProps }, ref) =>
      createElement(
        "span",
        {
          className: joinClassNames(...classNames, className),
          ...otherProps,
        },
        children
      )
  );
};
