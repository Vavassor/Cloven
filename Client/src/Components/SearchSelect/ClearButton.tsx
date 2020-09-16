import React, { MouseEventHandler } from "react";
import { ReactComponent as Cross } from "../../Assets/svg/cross.svg";
import styles from "./ClearButton.module.scss";

interface ClearButtonProps {
  handleMouseDown: MouseEventHandler<HTMLButtonElement>;
  label?: string;
}

export const ClearButton = ({
  handleMouseDown,
  label = "Clear",
}: ClearButtonProps) => {
  return (
    <button
      aria-label={label}
      className={styles.clearButton}
      onMouseDown={handleMouseDown}
      tabIndex={-1}
      type="button"
    >
      <Cross className={styles.icon} />
    </button>
  );
};
