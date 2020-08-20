import React, {
  ComponentType,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import CSSTransition, {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";
import { EnterHandler } from "react-transition-group/Transition";
import { debounce } from "../../Utilities/Debounce";
import { getOwnerDocument, getOwnerWindow } from "../../Utilities/Owner";
import { BackdropProps, Modal, ModalCloseEvent, ModalProps } from "../Modal";
import { ModalTransition } from "../ModalTransition";
import { Backdrop } from "./Backdrop";
import styles from "./Popover.module.scss";

export type HorizontalPlacement = "center" | "left" | "right";
export type VerticalPlacement = "bottom" | "center" | "top";

export interface Placement {
  horizontal: HorizontalPlacement | number;
  vertical: VerticalPlacement | number;
}

interface Bounds {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

interface ElementOffset {
  left: number;
  top: number;
}

interface ElementSize {
  height: number;
  width: number;
}

interface Position {
  x: number;
  y: number;
}

export interface PopoverClassNames extends CSSTransitionClassNames {
  popover: string;
}

export interface PopoverProps {
  anchor?: HTMLElement | null;
  anchorPlacement?: Placement;
  backdropProps?: Partial<BackdropProps>;
  classNames?: PopoverClassNames;
  container?: HTMLElement | null;
  contentProps?: Partial<HTMLAttributes<HTMLDivElement>>;
  handleClose?: (event: ModalCloseEvent) => void;
  modalProps?: Partial<ModalProps>;
  isOpen: boolean;
  pivot?: HTMLElement | null;
  pivotPlacement?: Placement;
  TransitionComponent?: ComponentType<CSSTransitionProps>;
  transitionDuration?: number;
  transitionProps?: Partial<CSSTransitionProps>;
  windowMargin?: number;
}

const defaultClassNames: PopoverClassNames = {
  appear: styles.appear,
  appearActive: styles.appearActive,
  appearDone: styles.appearDone,
  enter: styles.enter,
  enterActive: styles.enterActive,
  enterDone: styles.enterDone,
  exit: styles.exit,
  exitActive: styles.exitActive,
  exitDone: styles.exitDone,
  popover: styles.popover,
};

const adjustHorizontalPosition = (
  innerBounds: Bounds,
  outerBounds: Bounds,
  transformOrigin: Position
) => {
  if (innerBounds.left < outerBounds.left) {
    const deltaX = innerBounds.left - outerBounds.left;
    innerBounds.left -= deltaX;
    transformOrigin.x += deltaX;
  } else if (innerBounds.right > outerBounds.right) {
    const deltaX = innerBounds.right - outerBounds.right;
    innerBounds.left -= deltaX;
    transformOrigin.x += deltaX;
  }
};

const adjustVerticalPosition = (
  innerBounds: Bounds,
  outerBounds: Bounds,
  transformOrigin: Position
) => {
  if (innerBounds.top < outerBounds.top) {
    const deltaY = innerBounds.top - outerBounds.top;
    innerBounds.top -= deltaY;
    transformOrigin.y += deltaY;
  } else if (innerBounds.bottom > outerBounds.bottom) {
    const deltaY = innerBounds.bottom - outerBounds.bottom;
    innerBounds.top -= deltaY;
    transformOrigin.y += deltaY;
  }
};

const getBounds = (
  anchorOffset: ElementOffset,
  elementSize: ElementSize,
  transformOrigin: Position
): Bounds => {
  const left = anchorOffset.left - transformOrigin.x;
  const top = anchorOffset.top - transformOrigin.y;
  return {
    bottom: top + elementSize.height,
    left,
    right: left + elementSize.width,
    top,
  };
};

const getElementSize = (element: HTMLElement): ElementSize => {
  return {
    height: element.offsetHeight,
    width: element.offsetWidth,
  };
};

const getOffsetLeft = (
  elementSize: ElementSize,
  horizontalPosition: HorizontalPlacement | number
): number => {
  if (typeof horizontalPosition === "number") {
    return horizontalPosition;
  } else if (horizontalPosition === "center") {
    return elementSize.width / 2;
  } else if (horizontalPosition === "right") {
    return elementSize.width;
  }
  return 0;
};

const getOffsetTop = (
  elementSize: ElementSize,
  verticalPosition: VerticalPlacement | number
): number => {
  if (typeof verticalPosition === "number") {
    return verticalPosition;
  } else if (verticalPosition === "center") {
    return elementSize.height / 2;
  } else if (verticalPosition === "bottom") {
    return elementSize.height;
  }
  return 0;
};

const getPositionValue = (pixelValue: number): string => {
  return `${Math.round(pixelValue)}px`;
};

const getParentScroll = (parent: HTMLElement, child: HTMLElement) => {
  let element: HTMLElement | null = child;
  let scrollTop = 0;
  while (element !== parent) {
    element = element.parentElement;
    if (!element) {
      break;
    }
    scrollTop += element.scrollTop;
  }
  return scrollTop;
};

const getTransformOriginValue = (transformOrigin: Position): string => {
  return `${transformOrigin.x}px ${transformOrigin.y}px`;
};

export const Popover = forwardRef<
  HTMLDivElement,
  PropsWithChildren<PopoverProps>
>(function Popover(
  {
    anchor,
    anchorPlacement = {
      horizontal: "left",
      vertical: "top",
    },
    backdropProps,
    children,
    classNames = defaultClassNames,
    container,
    contentProps,
    handleClose,
    modalProps,
    isOpen,
    pivot,
    pivotPlacement = {
      horizontal: "left",
      vertical: "top",
    },
    TransitionComponent = CSSTransition,
    transitionDuration,
    transitionProps,
    windowMargin = 0,
  },
  ref
) {
  const content = useRef<HTMLDivElement | null>(null);

  const handleContentRef = useCallback((instance: HTMLDivElement | null) => {
    content.current = instance;
  }, []);

  const getAnchorOffset = useCallback(
    (pivotOffset: number): ElementOffset => {
      const resolvedAnchor = anchor || getOwnerDocument(content.current).body;
      const anchorRect = resolvedAnchor.getBoundingClientRect();

      const anchorHorizontal = anchorPlacement.horizontal;
      const anchorVertical =
        pivotOffset === 0 ? anchorPlacement.vertical : "center";

      return {
        left: getOffsetLeft(anchorRect, anchorHorizontal) + anchorRect.left,
        top: getOffsetTop(anchorRect, anchorVertical) + anchorRect.top,
      };
    },
    [anchor, anchorPlacement.horizontal, anchorPlacement.vertical]
  );

  const getPivotOffset = useCallback(
    (element: HTMLElement): number => {
      if (pivot && element.contains(pivot)) {
        const scrollTop = getParentScroll(element, pivot);
        return pivot.offsetTop + pivot.clientHeight / 2 - scrollTop || 0;
      }
      return 0;
    },
    [pivot]
  );

  const getTransformOrigin = useCallback(
    (elementSize: ElementSize, pivotOffset: number = 0): Position => {
      return {
        x: getOffsetLeft(elementSize, pivotPlacement.horizontal),
        y: getOffsetTop(elementSize, pivotPlacement.vertical) + pivotOffset,
      };
    },
    [pivotPlacement.horizontal, pivotPlacement.vertical]
  );

  const updatePosition = useCallback(() => {
    const element = content.current;
    if (!element) {
      return;
    }

    const pivotOffset = getPivotOffset(element);
    const elementSize = getElementSize(element);
    const transformOrigin = getTransformOrigin(elementSize, pivotOffset);
    const anchorOffset = getAnchorOffset(pivotOffset);

    const bounds = getBounds(anchorOffset, elementSize, transformOrigin);
    const containerWindow = getOwnerWindow(anchor);

    const windowBounds: Bounds = {
      bottom: containerWindow.innerHeight - windowMargin,
      left: windowMargin,
      right: containerWindow.innerWidth - windowMargin,
      top: windowMargin,
    };

    adjustVerticalPosition(bounds, windowBounds, transformOrigin);
    adjustHorizontalPosition(bounds, windowBounds, transformOrigin);

    element.style.left = getPositionValue(bounds.left);
    element.style.top = getPositionValue(bounds.top);
    element.style.transformOrigin = getTransformOriginValue(transformOrigin);
  }, [
    anchor,
    getAnchorOffset,
    getPivotOffset,
    getTransformOrigin,
    windowMargin,
  ]);

  const handleEntering: EnterHandler = (element, isAppearing) => {
    updatePosition();
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleResize = debounce(() => {
      updatePosition();
    });

    window.addEventListener("resize", handleResize.run);

    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize.run);
    };
  }, [isOpen, updatePosition]);

  return (
    <Modal
      BackdropComponent={Backdrop}
      backdropProps={backdropProps}
      container={container}
      handleClose={handleClose}
      isOpen={isOpen}
      ref={ref}
      {...modalProps}
    >
      <ModalTransition
        classNames={classNames}
        onEntering={handleEntering}
        in={isOpen}
        TransitionComponent={TransitionComponent}
        transitionDuration={transitionDuration}
        transitionProps={transitionProps}
        windowMargin={windowMargin}
      >
        <div
          className={classNames.popover}
          ref={handleContentRef}
          {...contentProps}
        >
          {children}
        </div>
      </ModalTransition>
    </Modal>
  );
});
