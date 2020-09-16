import React, { Children, useEffect, useRef } from "react";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import { getOwnerDocument } from "../../Utilities/Owner";
import { hasRef, isReactElement } from "../../Utilities/TypeGuards";

export interface FocusTrapProps {
  elementToFocusOnClose?: HTMLElement;
  getMountDocument: () => Document;
  isOpen: boolean;
  shouldAutoFocus?: boolean;
  shouldRestoreFocus?: boolean;
  shouldTrapFocus: () => boolean;
}

const sentinelStyle = {
  height: 0,
  outline: "none",
  overflow: "hidden",
  width: 0,
};

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  elementToFocusOnClose,
  getMountDocument,
  isOpen,
  shouldAutoFocus = true,
  shouldRestoreFocus = true,
  shouldTrapFocus,
}) => {
  const childrenRef = useRef<HTMLElement | null>(null);
  const elementToFocusOnCloseRef = useRef<HTMLElement | null>(null);
  const endSentinel = useRef<HTMLDivElement | null>(null);
  const ignoreNextEnforceFocus = useRef(false);
  const priorIsOpen = useRef(false);
  const startSentinel = useRef<HTMLDivElement | null>(null);

  const child = Children.only(children);
  const handleChildRef = useMergeRef(
    hasRef<HTMLElement>(child) ? child.ref : null,
    childrenRef
  );

  useEffect(() => {
    priorIsOpen.current = isOpen;
  }, [isOpen]);

  if (!priorIsOpen.current && isOpen) {
    const currentDocument = getMountDocument();
    elementToFocusOnCloseRef.current = currentDocument.activeElement as HTMLElement;
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const currentDocument = getOwnerDocument(childrenRef.current);

    const autoFocus = () => {
      if (
        childrenRef.current &&
        !childrenRef.current.contains(currentDocument.activeElement)
      ) {
        if (!childrenRef.current.hasAttribute("tabIndex")) {
          childrenRef.current.setAttribute("tabIndex", "-1");
        }
        childrenRef.current.focus();
      }
    };

    if (shouldAutoFocus) {
      autoFocus();
    }

    const trapFocus = () => {
      if (
        !currentDocument.hasFocus() ||
        !shouldTrapFocus() ||
        ignoreNextEnforceFocus.current
      ) {
        ignoreNextEnforceFocus.current = false;
        return;
      }

      if (
        childrenRef.current &&
        !childrenRef.current.contains(currentDocument.activeElement)
      ) {
        childrenRef.current.focus();
      }
    };

    const handleFocus = (event: FocusEvent) => {
      trapFocus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const TAB_KEY_CODE = 9;
      if (event.keyCode !== TAB_KEY_CODE) {
        return;
      }

      if (currentDocument.activeElement === childrenRef.current) {
        ignoreNextEnforceFocus.current = true;
        if (event.shiftKey) {
          endSentinel.current?.focus();
        } else {
          startSentinel.current?.focus();
        }
      }
    };

    currentDocument.addEventListener("focus", handleFocus);
    currentDocument.addEventListener("keydown", handleKeyDown);

    const FOCUS_TRAP_POLL_INTERVAL = 50;
    const focusTrapInterval = setInterval(() => {
      trapFocus();
    }, FOCUS_TRAP_POLL_INTERVAL);

    return () => {
      clearInterval(focusTrapInterval);

      currentDocument.removeEventListener("focus", handleFocus);
      currentDocument.removeEventListener("keydown", handleKeyDown);

      if (shouldRestoreFocus) {
        if (elementToFocusOnClose) {
          elementToFocusOnClose.focus();
        } else {
          elementToFocusOnCloseRef.current?.focus();
        }
        elementToFocusOnCloseRef.current = null;
      }
    };
  }, [isOpen, shouldAutoFocus, shouldRestoreFocus, shouldTrapFocus, elementToFocusOnClose]);

  if (isReactElement(child)) {
    return (
      <>
        <div style={sentinelStyle} tabIndex={0} ref={startSentinel} />
        {React.cloneElement(child, { ref: handleChildRef })}
        <div style={sentinelStyle} tabIndex={0} ref={endSentinel} />
      </>
    );
  } else if (child) {
    return <>{child}</>;
  } else {
    return null;
  }
};
