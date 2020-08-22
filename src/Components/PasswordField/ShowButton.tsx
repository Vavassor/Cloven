import React, { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Visiblility } from "../../Assets/svg/visibility.svg";
import { ReactComponent as VisiblilityOff } from "../../Assets/svg/visibility_off.svg";
import styles from "./ShowButton.module.scss";

interface ShowButtonProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  hideButtonLabel?: string;
  isShowing: boolean;
  showButtonLabel?: string;
}

export const ShowButton = ({
  handleClick,
  hideButtonLabel,
  isShowing,
  showButtonLabel,
}: ShowButtonProps) => {
  const { t } = useTranslation();
  const hideLabel = hideButtonLabel || t("passwordField.hideButtonLabel");
  const showLabel = showButtonLabel || t("passwordField.showButtonLabel");

  return (
    <button
      aria-label={isShowing ? hideLabel : showLabel}
      className={styles.button}
      onClick={handleClick}
      type="button"
    >
      {isShowing ? <VisiblilityOff /> : <Visiblility />}
    </button>
  );
};
