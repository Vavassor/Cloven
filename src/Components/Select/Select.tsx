import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Key } from "../../Types/Key";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import { FormControlContext } from "../FormControl";
import { Popper } from "../Popper";
import { SelectButton, SelectButtonProps } from "../SelectButton";
import { Option, SelectList } from "../SelectList";
import styles from "./Select.module.scss";

export interface SelectProps {
  buttonId?: string;
  className?: string;
  isAutoWidth?: boolean;
  labelId?: string;
  options: Option[];
  selectButtonProps?: Partial<SelectButtonProps>;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      buttonId: buttonIdProp,
      className,
      isAutoWidth = true,
      labelId: labelIdProp,
      options,
      selectButtonProps,
    },
    ref
  ) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const button = useRef<HTMLButtonElement | null>(null);
    const formControlState = useContext(FormControlContext);
    const handleButtonRef = useMergeRef(button, ref);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const list = useRef<HTMLUListElement | null>(null);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const buttonId = buttonIdProp || formControlState.inputId;
    const labelId = labelIdProp || formControlState.labelId;

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      setAnchor(event.currentTarget);
      setIsPopoverOpen(true);
      list.current?.focus();
    };

    const handleClose = useCallback(() => {
      setAnchor(null);
      setIsPopoverOpen(false);
    }, []);

    const handleKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
      switch (event.key) {
        case Key.Enter:
        case Key.Escape:
        case Key.Tab:
          event.preventDefault();
          button.current?.focus();
          handleClose();
          break;
      }
    };

    const handleSelectionChange = (
      selectedOption: Option,
      wasClicked: boolean
    ) => {
      setSelectedOption(selectedOption);
      if (wasClicked) {
        setIsPopoverOpen(false);
      }
    };

    return (
      <>
        <SelectButton
          className={className}
          id={buttonId}
          isPopoverOpen={isPopoverOpen}
          onClick={handleClick}
          ref={handleButtonRef}
          {...selectButtonProps}
        >
          {selectedOption.label}
        </SelectButton>
        <Popper
          anchor={anchor}
          isMatchingAnchorWidth={isAutoWidth}
          isOpen={isPopoverOpen}
          placement="bottom-start"
          shouldUseAltBoundary={false}
        >
          <SelectList
            autoFocus={true}
            className={styles.list}
            handleBlur={handleClose}
            handleKeyDown={handleKeyDown}
            handleSelectionChange={handleSelectionChange}
            labelId={labelId}
            options={options}
            ref={list}
            selectedOption={selectedOption}
            shouldShowFocus={false}
          />
        </Popper>
      </>
    );
  }
);
