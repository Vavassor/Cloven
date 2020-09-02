import React, { ComponentType, forwardRef } from "react";
import { joinClassNames } from "../../Utilities/Style";
import { Checkbox } from "./Checkbox";
import styles from "./OptionMulti.module.scss";
import { OptionContent } from "./SearchSelect";

interface OptionMultiProps {
  content: OptionContent;
  handleSelect: (selectedOption: OptionContent) => void;
  id: string;
  isActive: boolean;
  isSelected: boolean;
  StartAdornment?: ComponentType<StartAdornmentProps>;
  startAdornmentProps?: Partial<StartAdornmentProps>;
}

interface StartAdornmentProps {
  className?: string;
}

export const OptionMulti = forwardRef<HTMLLIElement, OptionMultiProps>(
  (
    {
      content,
      handleSelect,
      id,
      isActive,
      isSelected,
      StartAdornment = Checkbox,
      startAdornmentProps = {
        className: styles.startAdornment,
      },
    },
    ref
  ) => {
    const handleMouseDown = () => {
      handleSelect(content);
    };

    return (
      <li
        aria-selected={isSelected}
        className={joinClassNames(
          styles.option,
          isActive && styles.optionActive,
          isSelected && !isActive && styles.optionSelected
        )}
        id={id}
        onMouseDown={handleMouseDown}
        role="option"
        ref={ref}
      >
        <StartAdornment
          isActive={isActive}
          isChecked={isSelected}
          {...startAdornmentProps}
        />
        {content.label}
      </li>
    );
  }
);
