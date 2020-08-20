import React from "react";
import { joinClassNames } from "../../Utilities/Style";
import { ReactComponent as Checkmark } from "../../Assets/svg/checkmark.svg";
import styles from "./Checkbox.module.scss";

interface CheckboxClassNames {
  checkbox: string;
  checkboxChecked: string;
  checkboxUnchecked: string;
  checkmark: string;
  checkmarkFill: string;
}

interface CheckboxProps {
  className?: string;
  classNames?: CheckboxClassNames;
  isChecked: boolean;
}

const defaultClassNames: CheckboxClassNames = {
  checkbox: styles.checkbox,
  checkboxChecked: styles.checkboxChecked,
  checkboxUnchecked: styles.checkboxUnchecked,
  checkmark: styles.checkmark,
  checkmarkFill: styles.checkmarkFill,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  classNames = defaultClassNames,
  isChecked,
}) => {
  return (
    <div
      className={joinClassNames(
        classNames.checkbox,
        isChecked ? classNames.checkboxChecked : classNames.checkboxUnchecked,
        className
      )}
    >
      {isChecked && <Checkmark className={classNames.checkmark} />}
    </div>
  );
};
