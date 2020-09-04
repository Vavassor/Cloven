import { ReactElement, ReactNode, Ref, RefAttributes } from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

interface ComponentWithRef<T> {
  ref: Ref<T>;
}

export function hasRef<T>(
  component: ReactNode
): component is ComponentWithRef<T> {
  const attributes = component as RefAttributes<T>;
  return attributes.ref !== undefined;
}

export const hasTransition = (
  children: ReactNode
): children is ReactElement<CSSTransitionProps<HTMLElement>> => {
  return isReactElement(children) ? children.props.hasOwnProperty("in") : false;
};

export const isReactElement = (node: ReactNode): node is ReactElement => {
  return (
    !!node &&
    typeof node !== "boolean" &&
    typeof node !== "number" &&
    typeof node !== "string"
  );
};
