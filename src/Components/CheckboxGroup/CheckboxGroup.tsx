import React, { useContext } from "react";
import { joinIds } from "../../Utilities/Style";
import { FormControlContext } from "../FormControl";
import { Checkbox } from "./Checkbox";
import styles from "./CheckboxGroup.module.scss";

export interface CheckboxOption {
  id: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  errorId?: string;
  handleChange?: (option: CheckboxOption, isChecked: boolean) => void;
  hasError?: boolean;
  helpId?: string;
  id?: string;
  isDisabled?: boolean;
  labelId?: string;
  name: string;
  options: CheckboxOption[];
}

export const CheckboxGroup = ({
  errorId: errorIdProp,
  handleChange,
  hasError: hasErrorProp,
  helpId: helpIdProp,
  id,
  isDisabled: isDisabledProp,
  labelId: labelIdProp,
  name,
  options,
}: CheckboxGroupProps) => {
  const formControlState = useContext(FormControlContext);

  const errorId = errorIdProp || formControlState.errorId;
  const hasError = hasErrorProp || formControlState.hasError;
  const helpId = helpIdProp || formControlState.helpId;
  const inputId = id || formControlState.inputId;
  const isDisabled = isDisabledProp || formControlState.isDisabled;
  const labelId = labelIdProp || formControlState.labelId;

  return (
    <div
      aria-describedby={joinIds(errorId, helpId)}
      aria-invalid={hasError}
      aria-labelledby={labelId}
      className={styles.checkboxGroup}
      id={inputId}
      role="group"
    >
      {options.map((option) => (
        <Checkbox
          className={styles.checkbox}
          handleChange={handleChange}
          isGroupDisabled={isDisabled}
          name={name}
          option={option}
        />
      ))}
    </div>
  );
};
