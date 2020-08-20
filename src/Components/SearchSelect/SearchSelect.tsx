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
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import { scrollToListItem } from "../../Utilities/Scroll";
import { joinClassNames } from "../../Utilities/Style";
import { FormControlContext } from "../FormControl";
import { Popper } from "../Popper";
import { ClearButton } from "./ClearButton";
import { NoSuggestions } from "./NoSuggestions";
import { Option } from "./Option";
import styles from "./SearchSelect.module.scss";
import { ShowButton } from "./ShowButton";

export interface OptionContent {
  id: string;
  label: string;
  value: string;
}

export interface SearchSelectProps {
  className?: string;
  clearButtonLabel?: string;
  getAddValueMessage?: (newValue: string) => string;
  handleSelectionChange?: (option: OptionContent | null) => void;
  hasError?: boolean;
  hideSuggestionsLabel?: string;
  idPrefix: string;
  inputId?: string;
  isValueRestrictedToOptions?: boolean;
  labelId?: string;
  name?: string;
  noSuggestionsMessage?: string;
  options: OptionContent[];
  shouldUseAddValueOption?: boolean;
  showSuggestionsLabel?: string;
}

const findMatches = (query: string, options: OptionContent[]) => {
  return options.filter(
    ({ value }) =>
      value.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
  );
};

export const SearchSelect = forwardRef<HTMLDivElement, SearchSelectProps>(
  (
    {
      className,
      clearButtonLabel: clearButtonLabelProp,
      getAddValueMessage: getAddValueMessageProp,
      handleSelectionChange,
      hasError,
      hideSuggestionsLabel: hideSuggestionsLabelProp,
      idPrefix,
      inputId: inputIdProp,
      isValueRestrictedToOptions = true,
      labelId: labelIdProp,
      name,
      noSuggestionsMessage: noSuggestionsMessageProp,
      options,
      shouldUseAddValueOption = false,
      showSuggestionsLabel: showSuggestionsLabelProp,
    },
    ref
  ) => {
    const container = useRef<HTMLDivElement | null>(null);
    const handleRef = useMergeRef(ref, container);
    const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
    const formControlState = useContext(FormControlContext);
    const input = useRef<HTMLInputElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const list = useRef<HTMLUListElement | null>(null);
    const optionRefsById = useRef<Map<string, HTMLLIElement>>(new Map());
    const [selectedOption, setSelectedOption] = useState<OptionContent | null>(
      null
    );
    const [suggestions, setSuggestions] = useState<OptionContent[]>([]);
    const { t } = useTranslation();
    const [value, setValue] = useState("");

    const activeOption =
      activeOptionIndex !== -1 ? suggestions[activeOptionIndex] : null;
    const clearButtonLabel =
      clearButtonLabelProp || t("searchSelect.clearButtonLabel");
    const hideSuggestionsLabel =
      hideSuggestionsLabelProp || t("searchSelect.hideSuggestionsButtonLabel");
    const listboxId = `${idPrefix}-listbox`;
    const noSuggestionsMessage =
      noSuggestionsMessageProp || t("searchSelect.noSuggestionsMessage");
    const showSuggestionsLabel =
      showSuggestionsLabelProp || t("searchSelect.showSuggestionsButtonLabel");

    const inputId = inputIdProp || formControlState.inputId;
    const labelId = labelIdProp || formControlState.labelId;

    const defaultGetAddValueMessage = (newValue: string) => {
      return (
        t("searchSelect.addValueMessage", { value: newValue }) ||
        `Add “${newValue}”`
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

    const openPopover = () => {
      setIsPopoverOpen(true);
      setAnchor(container.current);
    };

    const updateSuggestions = (
      newSuggestions: OptionContent[],
      newValue: string
    ) => {
      if (
        isValueRestrictedToOptions ||
        !shouldUseAddValueOption ||
        newValue.length === 0
      ) {
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

    const deselectOption = () => {
      setSelectedOption(null);
      if (handleSelectionChange) {
        handleSelectionChange(null);
      }
    };

    const selectOption = (option: OptionContent) => {
      setSelectedOption(option);
      if (handleSelectionChange) {
        handleSelectionChange(option);
      }
      setValue(option.value);
      setActiveOptionIndex(-1);
      closePopover();
    };

    const handleBlur = () => {
      setIsFocused(false);
      closePopover();
      if (
        (isValueRestrictedToOptions || shouldUseAddValueOption) &&
        !selectedOption
      ) {
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
      deselectOption();
    };

    const handleMouseDownClear: MouseEventHandler<HTMLButtonElement> = (
      event
    ) => {
      event.preventDefault();
      if (isPopoverOpen) {
        closePopover();
      }
      clearValue();
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

        case Key.Escape:
          event.preventDefault();
          closePopover();
          break;

        case Key.Enter:
          if (activeOption) {
            event.preventDefault();
            selectOption(activeOption);
          }
          break;
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
                  <Option
                    content={option}
                    handleSelectionChange={selectOption}
                    isActive={index === activeOptionIndex}
                    key={option.id}
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
