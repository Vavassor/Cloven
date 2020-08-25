import React from "react";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./RadioButton.module.scss";
import { RadioOption } from "./RadioGroup";

interface RadioButtonProps {
  className?: string;
  handleChangeSelection: (option: RadioOption) => void;
  isChecked: boolean;
  isGroupDisabled?: boolean;
  name: string;
  option: RadioOption;
}

export const RadioButton = ({
  className,
  handleChangeSelection,
  isChecked,
  isGroupDisabled,
  name,
  option,
}: RadioButtonProps) => {
  const { id, isDisabled, label, value } = option;

  const handleClick = () => {
    handleChangeSelection(option);
  };

  return (
    <div className={joinClassNames(styles.button, className)}>
      <input
        checked={isChecked}
        disabled={isGroupDisabled || isDisabled}
        id={id}
        name={name}
        onClick={handleClick}
        type="radio"
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
