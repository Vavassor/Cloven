import React, {
  ChangeEventHandler,
  forwardRef,
  ReactNode,
  useContext,
  useState,
} from "react";
import { joinClassNames, joinIds } from "../../Utilities/Style";
import { FormControlContext } from "../FormControl";
import styles from "./TextField.module.scss";

type InputType = "password" | "search" | "text";

export interface TextFieldProps {
  className?: string;
  endInsert?: ReactNode;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  hasError?: boolean;
  id?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name?: string;
  placeholder?: string;
  startInsert?: ReactNode;
  type?: InputType;
}

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      className,
      endInsert,
      handleChange: handleChangeProp,
      hasError: hasErrorProp,
      id: idProp,
      isDisabled: isDisabledProp,
      isRequired: isRequiredProp,
      name,
      placeholder,
      startInsert,
      type = "text",
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const formControlState = useContext(FormControlContext);
    const [value, setValue] = useState("");

    const errorId = formControlState.errorId;
    const helpId = formControlState.helpId;
    const hasError = hasErrorProp || formControlState.hasError;
    const id = idProp || formControlState.inputId;
    const isDisabled = isDisabledProp || formControlState.isDisabled;
    const isRequired = isRequiredProp || formControlState.isRequired;

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setValue(event.currentTarget.value);
      if (handleChangeProp) {
        handleChangeProp(event);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    return (
      <div
        className={joinClassNames(
          styles.container,
          isDisabled && styles.containerDisabled,
          isFocused && styles.containerFocused,
          hasError && styles.containerError
        )}
        ref={ref}
      >
        {startInsert}
        <input
          aria-describedby={joinIds(errorId, helpId)}
          aria-invalid={hasError}
          autoComplete="off"
          className={joinClassNames(styles.input, className)}
          disabled={isDisabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          required={isRequired ? true : undefined}
          placeholder={placeholder}
          spellCheck={false}
          type={type}
          value={value}
        />
        {endInsert}
      </div>
    );
  }
);
