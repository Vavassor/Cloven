import React, { useContext, useState } from "react";
import { FormControlContext } from "../FormControl";
import { RadioButton } from "./RadioButton";
import { joinIds } from "../../Utilities/Style";

export interface RadioOption {
  id: string;
  isDisabled?: boolean;
  label: string;
  value: string;
}

export interface RadioGroupProps {
  className?: string;
  errorId?: string;
  hasError?: boolean;
  helpId?: string;
  id?: string;
  isDisabled?: boolean;
  labelId?: string;
  name: string;
  options: RadioOption[];
}

export const RadioGroup = ({
  className,
  errorId: errorIdProp,
  hasError: hasErrorProp,
  helpId: helpIdProp,
  id,
  isDisabled: isDisabledProp,
  labelId: labelIdProp,
  name,
  options,
}: RadioGroupProps) => {
  const formControlState = useContext(FormControlContext);
  const [selectedOption, setSelectedOption] = useState(options[0]);

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
      className={className}
      id={inputId}
      role="radiogroup"
    >
      {options.map((option) => (
        <RadioButton
          handleChangeSelection={setSelectedOption}
          isChecked={option.id === selectedOption.id}
          isGroupDisabled={isDisabled}
          option={option}
          name={name}
        />
      ))}
    </div>
  );
};
