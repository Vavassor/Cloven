import { Modifier, VirtualElement } from "@popperjs/core";
import React, {
  ComponentType,
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import CSSTransition, {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";
import { EndHandler } from "react-transition-group/Transition";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { LayoutDirection } from "../../Types/Theme";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import styles from "./styles.module.scss";

type EndHandlerWithNodeRef = (done: () => void) => void;

type Placement =
  | "bottom"
  | "bottom-end"
  | "bottom-start"
  | "end"
  | "end-end"
  | "end-start"
  | "start"
  | "start-end"
  | "start-start"
  | "top"
  | "top-end"
  | "top-start";

type TransformOriginHorizontal = "center" | "left" | "right";
type TransformOriginVertical = "bottom" | "center" | "top";

interface TransformOrigin {
  horizontal: TransformOriginHorizontal;
  vertical: TransformOriginVertical;
}

interface PopperProps {
  anchor: HTMLElement | VirtualElement | null;
  className?: string;
  container?: HTMLElement | null;
  hasArrow?: boolean;
  isMatchingAnchorWidth?: boolean;
  isOpen?: boolean;
  placement?: Placement;
  shouldUseAltBoundary?: boolean;
  transitionClassNames?: CSSTransitionClassNames;
  TransitionComponent?: ComponentType<CSSTransitionProps>;
  transitionDuration?: number;
  transitionProps?: Partial<CSSTransitionProps>;
}

const getPlacement = (
  placement: Placement,
  layoutDirection: LayoutDirection
) => {
  switch (placement) {
    case "bottom":
    case "bottom-end":
    case "bottom-start":
    case "top":
    case "top-end":
    case "top-start":
      return placement;
    default: {
      switch (layoutDirection) {
        case LayoutDirection.LTR: {
          switch (placement) {
            case "end":
              return "right";
            case "end-end":
              return "right-end";
            case "end-start":
              return "right-start";
            case "start":
              return "left";
            case "start-end":
              return "left-end";
            case "start-start":
              return "left-start";
          }
          break;
        }
        case LayoutDirection.RTL: {
          switch (placement) {
            case "end":
              return "left";
            case "end-end":
              return "left-end";
            case "end-start":
              return "left-start";
            case "start":
              return "right";
            case "start-end":
              return "right-end";
            case "start-start":
              return "right-start";
          }
          break;
        }
      }
      break;
    }
  }
};

const getHorizontal = (
  placement: Placement,
  layoutDirection: LayoutDirection
): TransformOriginHorizontal => {
  switch (placement) {
    case "bottom":
    case "end":
    case "start":
    case "top":
      return "center";

    case "bottom-end":
    case "end-end":
    case "start-end":
    case "top-end": {
      switch (layoutDirection) {
        case LayoutDirection.LTR:
          return "right";
        case LayoutDirection.RTL:
          return "left";
      }
      break;
    }

    case "bottom-start":
    case "end-start":
    case "start-start":
    case "top-start": {
      switch (layoutDirection) {
        case LayoutDirection.LTR:
          return "left";
        case LayoutDirection.RTL:
          return "right";
      }
      break;
    }
  }
};

const getVertical = (placement: Placement): TransformOriginVertical => {
  switch (placement) {
    case "bottom":
    case "bottom-end":
    case "bottom-start":
      return "top";

    case "end":
    case "end-end":
    case "end-start":
    case "start":
    case "start-end":
    case "start-start":
      return "center";

    case "top":
    case "top-end":
    case "top-start":
      return "bottom";
  }
};

const getTransformOrigin = (
  placement: Placement,
  layoutDirection: LayoutDirection
): TransformOrigin => {
  return {
    horizontal: getHorizontal(placement, layoutDirection),
    vertical: getVertical(placement),
  };
};

const defaultClassNames: CSSTransitionClassNames = {
  appear: styles.appear,
  appearActive: styles.appearActive,
  appearDone: styles.appearDone,
  enter: styles.enter,
  enterActive: styles.enterActive,
  enterDone: styles.enterDone,
  exit: styles.exit,
  exitActive: styles.exitActive,
  exitDone: styles.exitDone,
};

const sameWidth: Modifier<"sameWidth", {}> = {
  name: "sameWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.minWidth = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => () => {
    state.elements.popper.style.minWidth = `${
      state.elements.reference.getBoundingClientRect().width
    }px`;
  },
};

export const Popper = forwardRef<
  HTMLDivElement,
  PropsWithChildren<PopperProps>
>(
  (
    {
      anchor,
      children,
      className,
      container,
      hasArrow,
      isMatchingAnchorWidth = true,
      isOpen,
      placement = "top-start",
      shouldUseAltBoundary = true,
      transitionClassNames = defaultClassNames,
      TransitionComponent = CSSTransition,
      transitionDuration,
      transitionProps,
    },
    ref
  ) => {
    const [isExited, setIsExited] = useState(true);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    const handleRef = useMergeRef(setPopper, ref);
    const transition = useRef<HTMLDivElement | null>(null);
    const [arrow, setArrow] = useState<HTMLDivElement | null>(null);
    const { theme } = useContext(ThemeContext);
    const arrowModifiers = hasArrow
      ? [
          { name: "offset", options: { offset: [0, 10] } },
          { name: "arrow", options: { element: arrow } },
        ]
      : [];
    const widthModifiers = isMatchingAnchorWidth ? [sameWidth] : [];
    const { attributes, styles: popperStyles } = usePopper(anchor, popper, {
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            altBoundary: shouldUseAltBoundary,
            altAxis: true,
          },
        },
        ...arrowModifiers,
        ...widthModifiers,
      ],
      placement: getPlacement(placement, theme.layoutDirection),
    });
    const transformOrigin = getTransformOrigin(
      placement,
      theme.layoutDirection
    );

    const addEndListener: EndHandlerWithNodeRef = (done) => {
      const currentNode = transition.current;
      if (currentNode) {
        currentNode.addEventListener("transitionend", done, false);
      }
    };

    const handleEnter = () => {
      setIsExited(false);
    };

    const handleExited = () => {
      setIsExited(true);
    };

    useLayoutEffect(() => {
      setMountNode(container || document.body);
    }, [container]);

    if (!isOpen && isExited) {
      return null;
    }

    return mountNode
      ? createPortal(
          <div
            className={styles.popper}
            ref={handleRef}
            style={popperStyles.popper}
            {...attributes.popper}
          >
            <TransitionComponent
              addEndListener={(addEndListener as unknown) as EndHandler}
              appear
              classNames={transitionClassNames}
              in={isOpen}
              nodeRef={transition}
              onEnter={handleEnter}
              onExited={handleExited}
              timeout={transitionDuration}
              {...transitionProps}
            >
              {(state) => {
                return (
                  <PopperTransition
                    className={className}
                    handleArrowRef={setArrow}
                    hasArrow={hasArrow}
                    isExited={state === "exited" && !isOpen}
                    popperStyles={popperStyles}
                    ref={transition}
                    transformOrigin={transformOrigin}
                  >
                    {children}
                  </PopperTransition>
                );
              }}
            </TransitionComponent>
          </div>,
          mountNode
        )
      : null;
  }
);

interface PopperTransitionProps {
  className?: string;
  handleArrowRef: (instance: HTMLDivElement | null) => void;
  hasArrow?: boolean;
  isExited?: boolean;
  popperStyles: {
    [key: string]: CSSProperties;
  };
  transformOrigin: TransformOrigin;
}

const PopperTransition = forwardRef<
  HTMLDivElement,
  PropsWithChildren<PopperTransitionProps>
>(
  (
    {
      children,
      className,
      handleArrowRef,
      hasArrow,
      isExited,
      popperStyles,
      transformOrigin,
    },
    ref
  ) => {
    return (
      <div
        className={className}
        ref={ref}
        style={{
          transformOrigin: `${transformOrigin.horizontal} ${transformOrigin.vertical}`,
          visibility: isExited ? "hidden" : undefined,
        }}
      >
        {children}
        {hasArrow && (
          <div
            className={styles.arrow}
            ref={handleArrowRef}
            style={popperStyles.arrow}
          />
        )}
      </div>
    );
  }
);
