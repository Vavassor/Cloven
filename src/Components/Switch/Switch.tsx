import React, { forwardRef } from "react";

export interface SwitchProps {
  handleChange?: (isPressed: boolean) => void;
  isPressed?: boolean;
  label: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ handleChange, isPressed = false, label }, ref) => {
    const handleClick = () => {
      if (handleChange) {
        handleChange(!isPressed);
      }
    };

    return (
      <button
        aria-pressed={isPressed}
        onClick={handleClick}
        ref={ref}
        type="button"
      >
        {label}
      </button>
    );
  }
);
