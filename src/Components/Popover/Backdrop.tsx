import React from "react";
import { BackdropProps } from "../Modal";
import styles from "./Backdrop.module.scss";

export const Backdrop: React.FC<BackdropProps> = ({
  isOpen,
  ...otherProps
}) => {
  return (
    <div
      aria-hidden="true"
      className={styles.backdrop}
      {...otherProps}
    ></div>
  );
};
