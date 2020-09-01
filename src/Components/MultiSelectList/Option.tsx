import React, { ComponentType, forwardRef, MouseEventHandler } from "react";
import { joinClassNames } from "../../Utilities/Style";
import { Checkbox } from "./Checkbox";
import { OptionContent } from "./MultiSelectList";
import styles from "./Option.module.scss";

export interface OptionClassNames {
  option: string;
  optionActive: string;
  optionSelected: string;
}

interface OptionProps {
  classNames?: OptionClassNames;
  handleSelect: (option: OptionContent) => void;
  isActive: boolean;
  isSelected: boolean;
  StartAdornment?: ComponentType<StartAdornmentProps>;
  startAdornmentProps?: Partial<StartAdornmentProps>;
  state: OptionContent;
}

interface StartAdornmentProps {
  className?: string;
}

const defaultOptionClassNames: OptionClassNames = {
  option: styles.option,
  optionActive: styles.optionActive,
  optionSelected: styles.optionSelected,
};

export const Option = forwardRef<HTMLLIElement, OptionProps>(
  (
    {
      classNames = defaultOptionClassNames,
      handleSelect,
      isActive,
      isSelected,
      state,
      StartAdornment = Checkbox,
      startAdornmentProps = {
        className: styles.startAdornment,
      },
    },
    ref
  ) => {
    const { id, label } = state;

    const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
      handleSelect(state);
    };

    return (
      <li
        aria-selected={isSelected}
        className={joinClassNames(
          classNames.option,
          isActive && classNames.optionActive,
          isSelected && !isActive && classNames.optionSelected
        )}
        id={id}
        onClick={handleClick}
        role="option"
        ref={ref}
      >
        <StartAdornment
          isActive={isActive}
          isChecked={isSelected}
          {...startAdornmentProps}
        />
        {label}
      </li>
    );
  }
);
