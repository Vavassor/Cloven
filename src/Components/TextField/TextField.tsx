import React, { ChangeEventHandler, forwardRef, useContext, useState } from "react";
import { joinClassNames, joinIds } from "../../Utilities/Style";
import { FormControlContext } from "../FormControl";
import styles from "./TextField.module.scss";

type InputType = "password" | "search" | "text";

export interface TextFieldProps {
  className?: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  hasError?: boolean;
  id?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
  placeholder?: string;
  type?: InputType;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      handleChange: handleChangeProp,
      hasError: hasErrorProp,
      id: idProp,
      isDisabled: isDisabledProp,
      isRequired: isRequiredProp,
      name,
      placeholder,
      type = "text",
    },
    ref
  ) => {
    const formControlState = useContext(FormControlContext);
    const [value, setValue] = useState("");

    const errorId = formControlState.errorId;
    const helpId = formControlState.helpId;
    const hasError = hasErrorProp || formControlState.hasError;
    const id = idProp || formControlState.inputId;
    const isDisabled = isDisabledProp || formControlState.isDisabled;
    const isRequired = isRequiredProp || formControlState.isRequired;

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setValue(event.currentTarget.value);
      if (handleChangeProp) {
        handleChangeProp(event);
      }
    };

    return (
      <input
        aria-describedby={joinIds(errorId, helpId)}
        aria-invalid={hasError}
        autoComplete="off"
        className={joinClassNames(
          styles.input,
          hasError && styles.inputError,
          className
        )}
        disabled={isDisabled}
        id={id}
        name={name}
        onChange={handleChange}
        required={isRequired ? true : undefined}
        placeholder={placeholder}
        ref={ref}
        spellCheck={false}
        type={type}
        value={value}
      />
    );
  }
);
