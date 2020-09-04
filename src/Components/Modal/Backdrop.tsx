import React, { ComponentType, HTMLAttributes, MouseEventHandler } from "react";
import { CSSTransition } from "react-transition-group";
import {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";
import { EndHandler } from "react-transition-group/Transition";
import styles from "./Backdrop.module.scss";

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  classNames?: CSSTransitionClassNames;
  handleClick?: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  TransitionComponent?: ComponentType<CSSTransitionProps<undefined>>;
  transitionDuration?: number;
}

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

export const Backdrop: React.FC<BackdropProps> = ({
  classNames = defaultClassNames,
  onClick,
  isOpen,
  TransitionComponent = CSSTransition,
  transitionDuration,
  ...otherProps
}) => {
  const addEndListener: EndHandler<undefined> = (node, done) => {
    node.addEventListener("transitionend", done, false);
  };

  return (
    <TransitionComponent
      addEndListener={addEndListener}
      appear
      classNames={classNames}
      in={isOpen}
      timeout={transitionDuration}
    >
      <div aria-hidden="true" className={styles.backdrop} {...otherProps}></div>
    </TransitionComponent>
  );
};
