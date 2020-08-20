import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Key } from "../../Types/Key";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import { FormControlContext } from "../FormControl";
import { MultiSelectList, Option } from "../MultiSelectList";
import { Popper } from "../Popper";
import { SelectButton, SelectButtonProps } from "../SelectButton";

type RenderSelection = (selectedOptions: Option[]) => ReactNode;

export interface MultiSelectProps {
  isAutoWidth?: boolean;
  labelId?: string;
  options: Option[];
  renderSelection?: RenderSelection;
  selectButtonProps?: Partial<SelectButtonProps>;
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      isAutoWidth = true,
      labelId: labelIdProp,
      options,
      renderSelection,
      selectButtonProps,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
    const button = useRef<HTMLButtonElement | null>(null);
    const formControlState = useContext(FormControlContext);
    const handleButtonRef = useMergeRef(ref, button);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const list = useRef<HTMLUListElement | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const defaultRenderSelection = (selectedOptions: Option[]) => {
      return selectedOptions.length > 0
        ? selectedOptions.map((option) => option.label).join(", ")
        : t("multiSelect.buttonLabelNoneSelected");
    };
    renderSelection = renderSelection || defaultRenderSelection;

    const buttonId = formControlState.inputId;
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
        case Key.Escape:
        case Key.Tab:
          event.preventDefault();
          handleClose();
          button.current?.focus();
          break;
      }
    };

    return (
      <>
        <SelectButton
          id={buttonId}
          isPopoverOpen={isPopoverOpen}
          onClick={handleClick}
          ref={handleButtonRef}
          {...selectButtonProps}
        >
          {renderSelection(selectedOptions)}
        </SelectButton>
        <Popper
          anchor={anchor}
          isMatchingAnchorWidth={isAutoWidth}
          isOpen={isPopoverOpen}
          placement="bottom-start"
          shouldUseAltBoundary={false}
        >
          <MultiSelectList
            handleBlur={handleClose}
            handleKeyDown={handleKeyDown}
            handleSelectionChange={setSelectedOptions}
            labelId={labelId}
            options={options}
            selectedOptions={selectedOptions}
            shouldAutofocus={true}
            ref={list}
          />
        </Popper>
      </>
    );
  }
);
