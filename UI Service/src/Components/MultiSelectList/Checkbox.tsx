import React from "react";
import { ReactComponent as Checkmark } from "../../Assets/svg/checkmark.svg";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./Checkbox.module.scss";

interface CheckboxClassNames {
  checkbox: string;
  checkboxActiveUnchecked: string;
  checkboxChecked: string;
  checkboxUnchecked: string;
  checkboxInactiveUnchecked: string;
  checkmark: string;
}

interface CheckboxProps {
  className?: string;
  classNames?: CheckboxClassNames;
  isActive: boolean;
  isChecked: boolean;
}

const defaultClassNames: CheckboxClassNames = {
  checkbox: styles.checkbox,
  checkboxActiveUnchecked: styles.checkboxActiveUnchecked,
  checkboxChecked: styles.checkboxChecked,
  checkboxUnchecked: styles.checkboxUnchecked,
  checkboxInactiveUnchecked: styles.checkboxInactiveUnchecked,
  checkmark: styles.checkmark,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  classNames = defaultClassNames,
  isActive,
  isChecked,
}) => {
  return (
    <div
      className={joinClassNames(
        classNames.checkbox,
        isChecked ? classNames.checkboxChecked : classNames.checkboxUnchecked,
        !isChecked && isActive
          ? classNames.checkboxActiveUnchecked
          : classNames.checkboxInactiveUnchecked,
        className
      )}
    >
      {isChecked && <Checkmark className={classNames.checkmark} />}
    </div>
  );
};
