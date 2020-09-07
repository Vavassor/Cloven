import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./Button.module.scss";

type ButtonType = "button" | "submit" | "reset";

interface ButtonVariantClassNames {
  button?: string;
}

const primaryClassNames: ButtonVariantClassNames = {
  button: styles.primaryButton,
};

export interface ButtonProps {
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variantClassNames?: ButtonVariantClassNames;
  type?: ButtonType;
}

export const Button: React.FC<ButtonProps> = ({
  buttonProps,
  children,
  className,
  onClick,
  type = "button",
  variantClassNames = primaryClassNames,
}) => {
  return (
    <button
      className={joinClassNames(variantClassNames.button, className)}
      onClick={onClick}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
