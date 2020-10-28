import React, { forwardRef, MouseEventHandler } from "react";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./Option.module.scss";
import { OptionContent } from "./SelectList";

export interface OptionClassNames {
  option: string;
  optionSelected: string;
}

interface OptionProps {
  classNames?: OptionClassNames;
  content: OptionContent;
  handleSelect: (option: OptionContent, wasClicked?: boolean) => void;
  isSelected: boolean;
}

const defaultOptionClassNames: OptionClassNames = {
  option: styles.option,
  optionSelected: styles.optionSelected,
};

export const Option = forwardRef<HTMLLIElement, OptionProps>(
  (
    { classNames = defaultOptionClassNames, content, handleSelect, isSelected },
    ref
  ) => {
    const { id, label } = content;

    const handleClick: MouseEventHandler<HTMLLIElement> = () => {
      handleSelect(content, true);
    };

    return (
      <li
        aria-selected={isSelected ? true : undefined}
        className={joinClassNames(
          classNames.option,
          isSelected && classNames.optionSelected
        )}
        id={id}
        onClick={handleClick}
        ref={ref}
        role="option"
      >
        {label}
      </li>
    );
  }
);
