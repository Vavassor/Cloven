import React, { useState } from "react";
import { ReactComponent as Checkmark } from "../../Assets/svg/checkmark.svg";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./Checkbox.module.scss";
import { CheckboxOption } from "./CheckboxGroup";

interface CheckboxProps {
  className?: string;
  handleChange?: (option: CheckboxOption, isChecked: boolean) => void;
  isGroupDisabled?: boolean;
  name: string;
  option: CheckboxOption;
}

export const Checkbox = ({
  className,
  handleChange,
  isGroupDisabled,
  name,
  option,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { id, isDisabled, isRequired, label, value } = option;

  const handleClick = () => {
    const newIsChecked = !isChecked;
    if (handleChange) {
      handleChange(option, newIsChecked);
    }
    setIsChecked(newIsChecked);
  };

  return (
    <div className={joinClassNames(styles.container, className)}>
      <input
        checked={isChecked}
        className={styles.input}
        disabled={isGroupDisabled || isDisabled}
        id={id}
        onClick={handleClick}
        name={name}
        required={isRequired}
        type="checkbox"
        value={value}
      />
      <span className={styles.checkbox}>
        {isChecked && (
          <Checkmark className={styles.checkmark} viewBox="2 2 20 20" />
        )}
      </span>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
