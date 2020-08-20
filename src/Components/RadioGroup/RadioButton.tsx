import React from "react";
import { RadioOption } from "./RadioGroup";

interface RadioButtonProps {
  handleChangeSelection: (option: RadioOption) => void;
  isChecked: boolean;
  isGroupDisabled?: boolean;
  name: string;
  option: RadioOption;
}

export const RadioButton = ({
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
    <>
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
    </>
  );
};
