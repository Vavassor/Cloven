import React, {
  ChangeEventHandler,
  DetailedHTMLProps,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useContext,
  useState,
} from "react";
import { joinClassNames, joinIds } from "../../Utilities/Style";
import { FormControlContext } from "../FormControl";
import styles from "./TextField.module.scss";

type InputType = "email" | "password" | "search" | "text";

export interface TextFieldProps {
  className?: string;
  endInsert?: ReactNode;
  hasError?: boolean;
  id?: string;
  inputProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  isDisabled?: boolean;
  isRequired?: boolean;
  maxLength?: number;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  startInsert?: ReactNode;
  type?: InputType;
  value?: string;
}

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      className,
      endInsert,
      hasError: hasErrorProp,
      id: idProp,
      inputProps = {},
      isDisabled: isDisabledProp,
      isRequired: isRequiredProp,
      maxLength,
      name,
      onChange,
      placeholder,
      startInsert,
      type = "text",
      value,
    },
    ref
  ) => {
    const { onBlur, ...otherProps } = inputProps;
    const [isFocused, setIsFocused] = useState(false);
    const formControlState = useContext(FormControlContext);
    const errorId = formControlState.errorId;
    const helpId = formControlState.helpId;
    const hasError = hasErrorProp || formControlState.hasError;
    const id = idProp || formControlState.inputId;
    const isDisabled = isDisabledProp || formControlState.isDisabled;
    const isRequired = isRequiredProp || formControlState.isRequired;

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(event);
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
          hasError && styles.containerError,
          hasError && !isFocused && styles.containerErrorBlurred
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
          maxLength={maxLength}
          name={name}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          required={isRequired ? true : undefined}
          placeholder={placeholder}
          spellCheck={false}
          type={type}
          value={value}
          {...otherProps}
        />
        {endInsert}
      </div>
    );
  }
);
