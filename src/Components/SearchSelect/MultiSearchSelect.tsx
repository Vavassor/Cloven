import React, {
  ChangeEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Key } from "../../Types/Key";
import * as Array from "../../Utilities/Array";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import { scrollToListItem } from "../../Utilities/Scroll";
import { joinClassNames } from "../../Utilities/Style";
import { FormControlContext } from "../FormControl";
import { Popper } from "../Popper";
import { Chip } from "./Chip";
import { ClearButton } from "./ClearButton";
import styles from "./MultiSearchSelect.module.scss";
import { NoSuggestions } from "./NoSuggestions";
import { OptionMulti } from "./OptionMulti";
import { OptionContent } from "./SearchSelect";
import { ShowButton } from "./ShowButton";

export interface MultiSearchSelectProps {
  className?: string;
  clearButtonLabel?: string;
  getAddValueMessage?: (newValue: string) => string;
  handleChange?: (option: OptionContent[]) => void;
  hasError?: boolean;
  hideSuggestionsLabel?: string;
  idPrefix: string;
  inputId?: string;
  isValueRestrictedToOptions?: boolean;
  labelId?: string;
  name?: string;
  noSuggestionsMessage?: string;
  options: OptionContent[];
  showSuggestionsLabel?: string;
}

const findMatches = (query: string, options: OptionContent[]) => {
  return options.filter(
    ({ value }) =>
      value.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
  );
};

export const MultiSearchSelect = forwardRef<
  HTMLDivElement,
  MultiSearchSelectProps
>(
  (
    {
      className,
      clearButtonLabel: clearButtonLabelProp,
      getAddValueMessage: getAddValueMessageProp,
      handleChange: handleChangeSelection,
      hasError,
      hideSuggestionsLabel: hideSuggestionsLabelProp,
      idPrefix,
      inputId: inputIdProp,
      isValueRestrictedToOptions = true,
      labelId: labelIdProp,
      name,
      noSuggestionsMessage: noSuggestionsMessageProp,
      options,
      showSuggestionsLabel: showSuggestionsLabelProp,
    },
    ref
  ) => {
    const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
    const container = useRef<HTMLDivElement | null>(null);
    const formControlState = useContext(FormControlContext);
    const handleRef = useMergeRef(ref, container);
    const input = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const list = useRef<HTMLUListElement | null>(null);
    const optionRefsById = useRef<Map<string, HTMLLIElement>>(new Map());
    const [selectedOptions, setSelectedOptions] = useState<OptionContent[]>([]);
    const [suggestions, setSuggestions] = useState<OptionContent[]>([]);
    const { t } = useTranslation();
    const [value, setValue] = useState("");

    const activeOption =
      activeOptionIndex !== -1 ? suggestions[activeOptionIndex] : null;
    const listboxId = `${idPrefix}-listbox`;
    const clearButtonLabel =
      clearButtonLabelProp || t("searchSelect.clearButtonLabel");
    const hideSuggestionsLabel =
      hideSuggestionsLabelProp || t("searchSelect.hideSuggestionsButtonLabel");
    const noSuggestionsMessage =
      noSuggestionsMessageProp || t("searchSelect.noSuggestionsMessage");
    const showSuggestionsLabel =
      showSuggestionsLabelProp || t("searchSelect.showSuggestionsButtonLabel");

    const inputId = inputIdProp || formControlState.inputId;
    const labelId = labelIdProp || formControlState.labelId;

    const defaultGetAddValueMessage = (newValue: string) => {
      return (
        t("multiSearchSelect.addValueMessage", { value: newValue }) ||
        `Add “${value}”`
      );
    };
    const getAddValueMessage =
      getAddValueMessageProp || defaultGetAddValueMessage;

    const clearValue = () => {
      updateSuggestions(findMatches("", options), "");
      setValue("");
    };

    const closePopover = () => {
      setIsPopoverOpen(false);
      setAnchor(null);
    };

    const moveActive = (option: OptionContent, index: number) => {
      setActiveOptionIndex(index);
      const optionRef = optionRefsById.current.get(option.id);
      if (list.current && optionRef) {
        scrollToListItem(list.current, optionRef);
      }
    };

    const moveDown = () => {
      if (suggestions.length === 0) {
        return;
      }
      const newIndex =
        activeOptionIndex === -1
          ? 0
          : Math.min(activeOptionIndex + 1, suggestions.length - 1);
      moveActive(suggestions[newIndex], newIndex);
    };

    const moveUp = () => {
      const newIndex =
        activeOptionIndex === -1
          ? suggestions.length - 1
          : Math.max(activeOptionIndex - 1, 0);
      moveActive(suggestions[newIndex], newIndex);
    };

    const openPopover = () => {
      setIsPopoverOpen(true);
      setAnchor(container.current);
    };

    const toggleOption = (option: OptionContent) => {
      const foundIndex = Array.findIndexById(selectedOptions, option.id);
      const newSelectedOptions =
        foundIndex === -1
          ? Array.push(selectedOptions, option)
          : Array.remove(selectedOptions, foundIndex);
      setSelectedOptions(newSelectedOptions);
      if (handleChangeSelection) {
        handleChangeSelection(newSelectedOptions);
      }
      setValue("");
      setActiveOptionIndex(-1);
      closePopover();
    };

    const updateSuggestions = (
      newSuggestions: OptionContent[],
      newValue: string
    ) => {
      if (isValueRestrictedToOptions || newValue.length === 0) {
        setSuggestions(newSuggestions);
      } else {
        const addValueOption: OptionContent = {
          id: `${idPrefix}-add-value`,
          label: getAddValueMessage(newValue),
          value: newValue,
        };
        setSuggestions(newSuggestions.concat(addValueOption));
      }
    };

    const handleBackspace = (selectionStart: number | null) => {
      if (selectionStart !== 0 || selectedOptions.length === 0) {
        return;
      }
      setSelectedOptions(
        Array.remove(selectedOptions, selectedOptions.length - 1)
      );
    };

    const handleBlur = () => {
      setIsFocused(false);
      closePopover();
      if (isValueRestrictedToOptions) {
        clearValue();
      }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const newValue = event.currentTarget.value;
      if (!isPopoverOpen) {
        openPopover();
      }
      setValue(newValue);
      updateSuggestions(findMatches(newValue, options), newValue);
      setActiveOptionIndex(-1);
    };

    const handleFocus = () => {
      setIsFocused(true);
      openPopover();
      updateSuggestions(findMatches(value, options), value);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      switch (event.key) {
        case Key.ArrowDown:
          event.preventDefault();
          if (!isPopoverOpen) {
            openPopover();
          } else {
            moveDown();
          }
          break;

        case Key.ArrowUp:
          event.preventDefault();
          moveUp();
          break;

        case Key.Backspace:
          handleBackspace(event.currentTarget.selectionStart);
          break;

        case Key.Enter:
          if (activeOption) {
            event.preventDefault();
            toggleOption(activeOption);
          }
          break;

        case Key.Escape:
          event.preventDefault();
          closePopover();
          break;
      }
    };

    const handleMouseDownClear: MouseEventHandler<HTMLButtonElement> = (
      event
    ) => {
      event.preventDefault();
      if (isPopoverOpen) {
        closePopover();
      }
      clearValue();
      setSelectedOptions([]);
    };

    const handleMouseDownShow: MouseEventHandler<HTMLButtonElement> = (
      event
    ) => {
      event.preventDefault();
      if (isPopoverOpen) {
        closePopover();
      } else {
        input.current?.focus();
        openPopover();
      }
    };

    const handleOptionRef = (
      instance: HTMLLIElement | null,
      option: OptionContent
    ) => {
      if (instance) {
        optionRefsById.current.set(option.id, instance);
      }
    };

    const handleRemove = (option: OptionContent) => {
      toggleOption(option);
    };

    const handleSelect = (option: OptionContent) => {
      moveActive(option, Array.findIndexById(selectedOptions, option.id));
      toggleOption(option);
    };

    useEffect(() => {
      optionRefsById.current.clear();
    }, [options]);

    return (
      <>
        <div
          aria-expanded={isPopoverOpen}
          aria-haspopup="listbox"
          aria-owns={listboxId}
          className={joinClassNames(
            styles.searchSelect,
            hasError && styles.searchSelectError,
            isFocused && styles.searchSelectFocused,
            className
          )}
          ref={handleRef}
          role="combobox"
        >
          {selectedOptions.map((selectedOption) => (
            <Chip
              content={selectedOption}
              handleRemove={handleRemove}
              key={selectedOption.id}
            />
          ))}
          <input
            aria-activedescendant={activeOption?.id}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-invalid={hasError}
            aria-labelledby={labelId}
            autoCapitalize="none"
            autoComplete="off"
            className={styles.input}
            id={inputId}
            name={name}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            ref={input}
            spellCheck={false}
            type="text"
            value={value}
          />
          <ClearButton
            handleMouseDown={handleMouseDownClear}
            label={clearButtonLabel}
          />
          <ShowButton
            handleMouseDown={handleMouseDownShow}
            hideSuggestionsLabel={hideSuggestionsLabel}
            isPopoverOpen={isPopoverOpen}
            showSuggestionsLabel={showSuggestionsLabel}
          />
        </div>
        <Popper
          anchor={anchor}
          className={styles.popper}
          isOpen={isPopoverOpen}
          placement="bottom-start"
          shouldUseAltBoundary={false}
        >
          <ul
            aria-labelledby={labelId}
            className={styles.list}
            id={listboxId}
            ref={list}
            role="listbox"
            tabIndex={-1}
          >
            {suggestions.length > 0 ? (
              suggestions.map((option, index) => {
                const localHandleOptionRef = (
                  instance: HTMLLIElement | null
                ) => {
                  handleOptionRef(instance, option);
                };

                return (
                  <OptionMulti
                    handleSelect={handleSelect}
                    id={option.id}
                    isActive={index === activeOptionIndex}
                    isSelected={!!Array.findById(selectedOptions, option.id)}
                    key={option.id}
                    content={option}
                    ref={localHandleOptionRef}
                  />
                );
              })
            ) : (
              <NoSuggestions>{noSuggestionsMessage}</NoSuggestions>
            )}
          </ul>
        </Popper>
      </>
    );
  }
);
