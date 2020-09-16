import React, { useState } from "react";
import { TextField, TextFieldProps } from "../TextField";
import { ShowButton } from "./ShowButton";

export interface PasswordFieldProps extends TextFieldProps {
  hideButtonLabel?: string;
  showButtonLabel?: string;
}

export const PasswordField = ({
  hideButtonLabel,
  showButtonLabel,
  ...otherProps
}: PasswordFieldProps) => {
  const [isShowing, setIsShowing] = useState(false);

  const handleClick = () => {
    setIsShowing((priorIsShowing) => !priorIsShowing);
  };

  return (
    <TextField
      endInsert={
        <ShowButton
          handleClick={handleClick}
          hideButtonLabel={hideButtonLabel}
          isShowing={isShowing}
          showButtonLabel={showButtonLabel}
        />
      }
      type={isShowing ? "text" : "password"}
      {...otherProps}
    />
  );
};
