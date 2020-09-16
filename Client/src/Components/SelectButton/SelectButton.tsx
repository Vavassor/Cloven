import React, {
  ComponentType,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import { ReactComponent as DropdownArrowDownward } from "../../Assets/svg/dropdown_arrow_downward.svg";
import { ReactComponent as DropdownArrowUpward } from "../../Assets/svg/dropdown_arrow_upward.svg";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./SelectButton.module.scss";

interface SelectButtonClassNames {
  button: string;
  buttonPopoverOpen: string;
  label: string;
}

export interface SelectButtonProps {
  className?: string;
  classNames?: SelectButtonClassNames;
  EndAdornmentComponent?: ComponentType<EndAdornmentProps>;
  endAdornmentProps?: Partial<EndAdornmentProps>;
  id: string;
  isPopoverOpen: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const defaultClassNames: SelectButtonClassNames = {
  button: styles.button,
  buttonPopoverOpen: styles.buttonPopoverOpen,
  label: styles.label,
};

interface EndAdornmentClassNames {
  endAdornment: string;
}

interface EndAdornmentProps {
  classNames?: EndAdornmentClassNames;
  isPopoverOpen: boolean;
}

const defaultEndAdornmentClassNames: EndAdornmentClassNames = {
  endAdornment: styles.endAdornment,
};

const EndAdornment: React.FC<EndAdornmentProps> = ({
  classNames = defaultEndAdornmentClassNames,
  isPopoverOpen,
}) => {
  return !isPopoverOpen ? (
    <DropdownArrowDownward className={classNames.endAdornment} />
  ) : (
    <DropdownArrowUpward className={classNames.endAdornment} />
  );
};

export const SelectButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<SelectButtonProps>
>(
  (
    {
      children,
      className,
      classNames = defaultClassNames,
      EndAdornmentComponent = EndAdornment,
      endAdornmentProps,
      id,
      isPopoverOpen,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    return (
      <button
        aria-expanded={isPopoverOpen ? true : undefined}
        aria-haspopup="listbox"
        className={joinClassNames(
          classNames.button,
          isPopoverOpen && classNames.buttonPopoverOpen,
          className
        )}
        id={id}
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={ref}
        type="button"
      >
        <div className={classNames.label}>{children}</div>
        <EndAdornmentComponent
          {...endAdornmentProps}
          isPopoverOpen={isPopoverOpen}
        />
      </button>
    );
  }
);
