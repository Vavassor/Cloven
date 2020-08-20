import React, { forwardRef } from "react";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./Option.module.scss";
import { OptionContent } from "./SearchSelect";

interface OptionProps {
  content: OptionContent;
  handleSelectionChange: (selectedOption: OptionContent) => void;
  isActive: boolean;
}

export const Option = forwardRef<HTMLLIElement, OptionProps>(
  ({ content, handleSelectionChange, isActive }, ref) => {
    const handleMouseDown = () => {
      handleSelectionChange(content);
    };

    return (
      <li
        aria-selected={isActive ? true : undefined}
        className={joinClassNames(
          styles.listItem,
          isActive && styles.listItemActive
        )}
        id={content.id}
        onMouseDown={handleMouseDown}
        ref={ref}
        role="option"
      >
        {content.label}
      </li>
    );
  }
);
