import React, { MouseEventHandler } from "react";
import { ReactComponent as DropdownArrowDownward } from "../../Assets/svg/dropdown_arrow_downward.svg";
import { ReactComponent as DropdownArrowUpward } from "../../Assets/svg/dropdown_arrow_upward.svg";
import styles from "./ShowButton.module.scss";

export interface ShowButtonProps {
  handleMouseDown: MouseEventHandler<HTMLButtonElement>;
  hideSuggestionsLabel?: string;
  isPopoverOpen: boolean;
  showSuggestionsLabel?: string;
}

export const ShowButton = ({
  handleMouseDown,
  hideSuggestionsLabel = "Hide suggestions",
  isPopoverOpen,
  showSuggestionsLabel = "Show suggestions",
}: ShowButtonProps) => {
  return (
    <button
      aria-label={isPopoverOpen ? showSuggestionsLabel : hideSuggestionsLabel}
      className={styles.showButton}
      onMouseDown={handleMouseDown}
      tabIndex={-1}
      type="button"
    >
      {!isPopoverOpen ? (
        <DropdownArrowDownward className={styles.dropdownArrow} />
      ) : (
        <DropdownArrowUpward className={styles.dropdownArrow} />
      )}
    </button>
  );
};
