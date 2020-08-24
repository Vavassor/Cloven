import React from "react";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./FormGroup.module.scss";

export interface FormGroupProps {
  className?: string;
  isDisabled?: boolean;
  name?: string;
  title: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  isDisabled,
  name,
  title,
}) => {
  return (
    <fieldset
      className={joinClassNames(styles.fieldset, className)}
      disabled={isDisabled}
      name={name}
    >
      <legend className={styles.legend}>{title}</legend>
      {children}
    </fieldset>
  );
};
