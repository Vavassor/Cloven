import React from "react";
import { ReactComponent as Checkmark } from "../../Assets/svg/checkmark.svg";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  className?: string;
  handleChange?: (newIsChecked: boolean) => void;
  hasError?: boolean;
  id?: string;
  isChecked: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  label: string;
  name: string;
  value: string;
}

export const Checkbox = ({
  className,
  handleChange,
  hasError,
  id,
  isChecked,
  isDisabled,
  isRequired,
  label,
  name,
  value,
}: CheckboxProps) => {
  const handleClick = () => {
    if (handleChange) {
      handleChange(!isChecked);
    }
  };

  return (
    <div className={joinClassNames(styles.container, className)}>
      <input
        aria-invalid={hasError ? "true" : undefined}
        checked={isChecked}
        className={styles.input}
        disabled={isDisabled}
        id={id}
        onClick={handleClick}
        name={name}
        required={isRequired}
        type="checkbox"
        value={value}
      />
      <span
        className={joinClassNames(
          styles.checkbox,
          hasError && styles.checkboxError
        )}
      >
        {isChecked && (
          <Checkmark className={styles.checkmark} viewBox="2 2 20 20" />
        )}
      </span>
      <label
        className={joinClassNames(styles.label, hasError && styles.labelError)}
        htmlFor={id}
      >
        {label}
        {isRequired && <span aria-hidden="true">&thinsp;*</span>}
      </label>
    </div>
  );
};
