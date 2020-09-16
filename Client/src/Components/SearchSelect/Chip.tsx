import React from "react";
import { ReactComponent as Cross } from "../../Assets/svg/cross.svg";
import styles from "./Chip.module.scss";
import { OptionContent } from "./SearchSelect";

interface ChipProps {
  content: OptionContent;
  handleRemove: (option: OptionContent) => void;
}

export const Chip = ({ content, handleRemove }: ChipProps) => {
  const handleClick = () => {
    handleRemove(content);
  };

  return (
    <button
      className={styles.chip}
      onClick={handleClick}
      tabIndex={-1}
      type="button"
    >
      {content.label}
      <Cross className={styles.icon} />
    </button>
  );
};
