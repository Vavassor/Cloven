import React, { forwardRef, PropsWithChildren } from "react";
import { Label, LabelProps } from "../Label";
import styles from "./FormControl.module.scss";
import { FormControlContext, FormControlState } from "./FormControlContext";

export interface FormControlProps {
  className?: string;
  error?: string;
  help?: string;
  inputId: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  label: string;
  labelProps?: Partial<LabelProps>;
}

export const FormControl = forwardRef<
  HTMLDivElement,
  PropsWithChildren<FormControlProps>
>(
  (
    {
      children,
      className,
      error,
      help,
      inputId,
      isDisabled,
      isRequired,
      label,
      labelProps,
    },
    ref
  ) => {
    const errorId = `${inputId}-error`;
    const hasError = !!error;
    const helpId = `${inputId}-help`;
    const labelId = `${inputId}-label`;

    const formControlState: FormControlState = {
      errorId: hasError ? errorId : undefined,
      hasError,
      helpId: !!help ? helpId : undefined,
      inputId,
      isDisabled,
      isRequired,
      labelId,
    };

    return (
      <FormControlContext.Provider value={formControlState}>
        <div className={className} ref={ref}>
          <Label
            hasError={hasError}
            htmlFor={inputId}
            id={labelId}
            isDisabled={isDisabled}
            isRequired={isRequired}
            {...labelProps}
          >
            {label}
          </Label>
          {children}
          {help && (
            <small className={styles.help} id={helpId}>
              {help}
            </small>
          )}
          {error && (
            <div className={styles.error} id={errorId}>
              {error}
            </div>
          )}
        </div>
      </FormControlContext.Provider>
    );
  }
);
