/**
 * @file A wrapper for 'react-transition-group/CSSTransition' that forwards refs for use as the
 *   direct child of a Modal component.
 * @author Andrew Dawson
 */
import React, {
  Children,
  cloneElement,
  ComponentType,
  forwardRef,
  PropsWithChildren,
  useRef,
} from "react";
import {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";
import { EndHandler, EnterHandler } from "react-transition-group/Transition";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import {
  hasRef,
  isReactElement,
} from "../../Utilities/Typeguards/ReactTypeGuards";

export interface ModalTransitionProps {
  classNames: CSSTransitionClassNames;
  onEntering?: EnterHandler<HTMLDivElement>;
  in: boolean;
  TransitionComponent: ComponentType<CSSTransitionProps<HTMLDivElement>>;
  transitionDuration?: number;
  transitionProps?: Partial<CSSTransitionProps<HTMLDivElement>>;
  windowMargin?: number;
}

const getMaxDimensionWithMargins = (margin: number): string => {
  return margin === 0 ? "100%" : `calc(100% - ${2 * margin}px)`;
};

export const ModalTransition = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ModalTransitionProps>
>(
  (
    {
      children,
      classNames,
      in: inProp,
      TransitionComponent,
      transitionDuration,
      transitionProps,
      windowMargin = 0,
      ...otherProps
    },
    ref
  ) => {
    const child = Children.only(children);
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const foreignRef = useMergeRef(
      hasRef<HTMLDivElement>(child) ? child.ref : null,
      ref
    );
    const handleRef = useMergeRef(nodeRef, foreignRef);

    const addEndListener: EndHandler<HTMLDivElement> = (done) => {
      const currentNode = nodeRef.current;
      if (currentNode) {
        currentNode.addEventListener("transitionend", done, false);
      }
    };

    return (
      <TransitionComponent
        addEndListener={addEndListener}
        appear
        classNames={classNames}
        in={inProp}
        nodeRef={nodeRef}
        timeout={transitionDuration}
        {...otherProps}
        {...transitionProps}
      >
        {(state) => {
          return isReactElement(child)
            ? cloneElement(child, {
                ref: handleRef,
                style: {
                  maxHeight: getMaxDimensionWithMargins(windowMargin),
                  maxWidth: getMaxDimensionWithMargins(windowMargin),
                  visibility:
                    state === "exited" && !inProp ? "hidden" : undefined,
                },
              })
            : children;
        }}
      </TransitionComponent>
    );
  }
);
