import React, {
  ComponentType,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import CSSTransition, {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";
import { Modal, ModalCloseEvent } from "../Modal";
import { ModalTransition } from "../ModalTransition";
import styles from "./Dialog.module.scss";

export interface DialogClassNames extends CSSTransitionClassNames {
  container: string;
  dialog: string;
}

export interface DialogProps {
  classNames?: DialogClassNames;
  container?: HTMLElement | null;
  contentProps?: Partial<HTMLAttributes<HTMLDivElement>>;
  descriptionId?: string;
  handleClose?: (event: ModalCloseEvent) => void;
  isOpen: boolean;
  labelId: string;
  TransitionComponent?: ComponentType<CSSTransitionProps>;
  transitionDuration?: number;
  transitionProps?: Partial<CSSTransitionProps>;
}

const defaultClassNames: DialogClassNames = {
  appear: styles.appear,
  appearActive: styles.appearActive,
  appearDone: styles.appearDone,
  container: styles.container,
  dialog: styles.dialog,
  enter: styles.enter,
  enterActive: styles.enterActive,
  enterDone: styles.enterDone,
  exit: styles.exit,
  exitActive: styles.exitActive,
  exitDone: styles.exitDone,
};

export const Dialog = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DialogProps>
>(
  (
    {
      children,
      classNames = defaultClassNames,
      container,
      contentProps,
      descriptionId,
      handleClose,
      isOpen,
      labelId,
      TransitionComponent = CSSTransition,
      transitionDuration,
      transitionProps,
    },
    ref
  ) => {
    const handleContainerClick: MouseEventHandler<HTMLDivElement> = (event) => {
      if (event.target !== event.currentTarget) {
        return;
      }
      if (handleClose) {
        handleClose({ event, type: "BACKDROP_CLICK" });
      }
    };

    return (
      <Modal
        container={container}
        handleClose={handleClose}
        isOpen={isOpen}
        ref={ref}
      >
        <ModalTransition
          classNames={classNames}
          in={isOpen}
          TransitionComponent={TransitionComponent}
          transitionDuration={transitionDuration}
          transitionProps={transitionProps}
        >
          <div className={classNames.container} onClick={handleContainerClick}>
            <div
              aria-describedby={descriptionId}
              aria-labelledby={labelId}
              aria-modal="true"
              className={classNames.dialog}
              role="dialog"
              {...contentProps}
            >
              {children}
            </div>
          </div>
        </ModalTransition>
      </Modal>
    );
  }
);
