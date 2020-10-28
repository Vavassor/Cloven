import React, { forwardRef } from "react";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./Switch.module.scss";

export interface SwitchProps {
  handleChange?: (isChecked: boolean) => void;
  idPrefix: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  label: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ handleChange, idPrefix, isChecked = false, isDisabled, label }, ref) => {
    const buttonId = `${idPrefix}-button`;

    const handleClick = () => {
      if (handleChange) {
        handleChange(!isChecked);
      }
    };

    return (
      <div className={styles.switch}>
        <button
          aria-checked={isChecked}
          className={styles.button}
          disabled={isDisabled}
          id={buttonId}
          onClick={handleClick}
          ref={ref}
          role="switch"
          type="button"
        >
          <div className={styles.track}></div>
          <div
            className={joinClassNames(
              styles.thumb,
              isChecked && styles.thumbChecked
            )}
          ></div>
        </button>
        <label className={styles.label} htmlFor={buttonId}>
          {label}
        </label>
      </div>
    );
  }
);
