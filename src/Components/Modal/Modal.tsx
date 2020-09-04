/**
 * @file An internal component for any kind of overlay element that may cover other elements.
 * @author Andrew Dawson
 */
import React, {
  cloneElement,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { EnterHandler, ExitHandler } from "react-transition-group/Transition";
import { useEventCallback } from "../../Utilities/Hooks/useEventCallback";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import { getOwnerDocument } from "../../Utilities/Owner";
import { joinClassNames } from "../../Utilities/Style";
import { hasTransition } from "../../Utilities/TypeGuards";
import { Backdrop, BackdropProps } from "./Backdrop";
import { FocusTrap } from "./FocusTrap";
import styles from "./Modal.module.scss";
import { ModalManager, ModalMount } from "./ModalManager";

export interface BackdropClickEvent {
  event: MouseEvent<HTMLDivElement>;
  type: "BACKDROP_CLICK";
}

export interface EscapeKeyDownCloseEvent {
  event: KeyboardEvent<HTMLDivElement>;
  type: "ESCAPE_KEY_DOWN";
}

export type ModalCloseEvent = BackdropClickEvent | EscapeKeyDownCloseEvent;

export interface ModalProps {
  BackdropComponent?: React.ElementType<BackdropProps>;
  backdropProps?: Partial<BackdropProps>;
  container?: HTMLElement | null;
  handleBackdropClick?: MouseEventHandler<HTMLDivElement>;
  handleClose?: (event: ModalCloseEvent) => void;
  handleEscapeKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  isOpen: boolean;
  manager?: ModalManager;
  shouldAutoFocus?: boolean;
  shouldLockScroll?: boolean;
  shouldTrapFocus?: boolean;
  shouldRestoreFocus?: boolean;
}

const defaultManager = new ModalManager();

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  function Modal(
    {
      BackdropComponent = Backdrop,
      backdropProps,
      children,
      container,
      handleBackdropClick,
      handleClose,
      handleEscapeKeyDown,
      isOpen,
      manager = defaultManager,
      shouldAutoFocus,
      shouldLockScroll = true,
      shouldTrapFocus = true,
      shouldRestoreFocus = true,
    },
    ref
  ) {
    const [hasExited, setHasExited] = useState(true);
    const modal = useRef<HTMLDivElement | null>(null);
    const handleRef = useMergeRef(modal, ref);
    const mountNode = useRef<Element | null>(null);
    const mount = useRef<ModalMount>({
      modal: modal.current,
      mountNode: mountNode.current,
    });

    const getMount = useCallback(() => {
      mount.current.modal = modal.current;
      mount.current.mountNode = mountNode.current;
      return mount.current;
    }, []);

    const getMountDocument = useCallback(() => {
      return getOwnerDocument(container);
    }, [container]);

    const handleMount = () => {
      manager.mount(getMount(), { shouldLockScroll });
    };

    const isTopModal = useCallback(() => {
      return manager.isTopModal(getMount());
    }, [getMount, manager]);

    const getShouldTrapFocus = useCallback(() => {
      return isTopModal() && shouldTrapFocus;
    }, [isTopModal, shouldTrapFocus]);

    const localHandleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }
      if (handleBackdropClick) {
        handleBackdropClick(event);
      }
      if (handleClose) {
        handleClose({ event, type: "BACKDROP_CLICK" });
      }
    };

    const localHandleClose = useCallback(() => {
      manager.remove(getMount());
    }, [getMount, manager]);

    const handleEnter: EnterHandler<HTMLDivElement> = (isAppearing) => {
      setHasExited(false);
      if (hasTransition(children) && children.props.onEnter) {
        children.props.onEnter(isAppearing);
      }
    };

    const handleExited: ExitHandler<HTMLDivElement> = () => {
      setHasExited(true);
      if (hasTransition(children) && children.props.onExited) {
        children.props.onExited();
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Escape" || !isTopModal()) {
        return;
      }
      if (handleEscapeKeyDown) {
        handleEscapeKeyDown(event);
      }
      event.stopPropagation();
      if (handleClose) {
        handleClose({ event, type: "ESCAPE_KEY_DOWN" });
      }
    };

    const handleOpen = useEventCallback(() => {
      manager.add(getMount(), container || getMountDocument().body);
      if (modal.current) {
        handleMount();
      }
    });

    const handleContainerChange = useEventCallback(() => {
      if (isOpen && isTopModal()) {
        handleMount();
      }
    });

    const isChildTransition = hasTransition(children);

    useEffect(() => {
      if (isOpen) {
        handleOpen();
      } else {
        localHandleClose();
      }
    }, [localHandleClose, handleOpen, isChildTransition, isOpen]);

    useLayoutEffect(() => {
      mountNode.current = container || document.body;
      handleContainerChange();
    }, [container, handleContainerChange]);

    if (!isOpen && (!isChildTransition || hasExited)) {
      return null;
    }

    const currentMountNode = mountNode.current;

    return currentMountNode
      ? createPortal(
          <div
            className={joinClassNames(
              styles.root,
              !isOpen && hasExited && styles.hidden
            )}
            onKeyDown={handleKeyDown}
            ref={handleRef}
          >
            <BackdropComponent
              isOpen={isOpen}
              onClick={localHandleBackdropClick}
              {...backdropProps}
            />
            <FocusTrap
              getMountDocument={getMountDocument}
              isOpen={isOpen}
              shouldAutoFocus={shouldAutoFocus}
              shouldTrapFocus={getShouldTrapFocus}
              shouldRestoreFocus={shouldRestoreFocus}
            >
              {hasTransition(children)
                ? cloneElement(children, {
                    onEnter: handleEnter,
                    onExited: handleExited,
                  })
                : children}
            </FocusTrap>
          </div>,
          currentMountNode
        )
      : currentMountNode;
  }
);
