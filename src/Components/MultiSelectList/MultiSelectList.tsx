import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Key } from "../../Types/Key";
import * as Array from "../../Utilities/Array";
import { useMergeRef } from "../../Utilities/Hooks/useMergeRef";
import { scrollToListItem } from "../../Utilities/Scroll";
import { joinClassNames } from "../../Utilities/Style";
import styles from "./MultiSelectList.module.scss";
import { Option, OptionClassNames } from "./Option";

export interface OptionContent {
  id: string;
  label: string;
  value: string;
}

export interface MultiSelectListClassNames {
  selectList: string;
}

export interface MultiSelectListProps {
  className?: string;
  classNames?: MultiSelectListClassNames;
  handleBlur?: FocusEventHandler<HTMLUListElement>;
  handleKeyDown?: KeyboardEventHandler<HTMLUListElement>;
  handleSelectionChange?: (selectedOptions: OptionContent[]) => void;
  labelId: string;
  optionClassNames?: OptionClassNames;
  options: OptionContent[];
  selectedOptions: OptionContent[];
  shouldAutofocus?: boolean;
  tabIndex?: number;
}

const defaultClassNames: MultiSelectListClassNames = {
  selectList: styles.selectList,
};

const addInSortedOrder = (
  values: OptionContent[],
  value: OptionContent,
  referenceValues: OptionContent[]
) => {
  const referenceIndex = Array.findIndexById(referenceValues, value.id);
  let addIndex = -1;
  for (let i = referenceIndex + 1; i < referenceValues.length - 1; i++) {
    const nextNearest = referenceValues[i];
    const foundIndex = Array.findIndexById(values, nextNearest.id);
    if (foundIndex !== -1) {
      addIndex = foundIndex;
      break;
    }
  }
  if (addIndex === -1) {
    return values.concat(value);
  }
  return Array.add(values, value, addIndex);
};

export const MultiSelectList = forwardRef<
  HTMLUListElement,
  MultiSelectListProps
>(
  (
    {
      className,
      classNames = defaultClassNames,
      handleBlur,
      handleKeyDown,
      handleSelectionChange,
      labelId,
      optionClassNames,
      options,
      selectedOptions,
      shouldAutofocus,
      tabIndex = 0,
    },
    ref
  ) => {
    const [activeDescendantId, setActiveDescendantId] = useState("");
    const list = useRef<HTMLUListElement | null>(null);
    const handleRef = useMergeRef(list, ref);
    const optionRefsById = useRef<Map<string, HTMLLIElement>>(new Map());
    const [recentlySelectedIds, setRecentlySelectedIds] = useState<string[]>(
      []
    );

    const handleOptionRef = (
      instance: HTMLLIElement | null,
      option: OptionContent
    ) => {
      if (instance) {
        optionRefsById.current.set(option.id, instance);
      }
    };

    const addRangeToRecent = (startIndex: number, endIndex: number) => {
      setRecentlySelectedIds((priorOptions) => {
        const ids = priorOptions.concat(
          options.slice(startIndex, endIndex).map((option) => option.id)
        );
        return Array.trimStart(ids, options.length);
      });
    };

    const addSingleToRecent = (id: string) => {
      setRecentlySelectedIds((priorIds) =>
        Array.trimStart(priorIds.concat(id), options.length)
      );
    };

    const removeSingleFromRecent = (id: string) => {
      setRecentlySelectedIds((priorIds) =>
        priorIds.filter((priorId) => priorId !== id)
      );
    };

    const selectOptions = (
      newOptions:
        | OptionContent[]
        | ((priorOptions: OptionContent[]) => OptionContent[])
    ) => {
      if (handleSelectionChange) {
        handleSelectionChange(
          typeof newOptions === "function"
            ? newOptions(selectedOptions)
            : newOptions
        );
      }
    };

    const selectRange = (startIndex: number, endIndex: number) => {
      selectOptions((priorOptions) => {
        let newOptions = priorOptions;
        for (let i = startIndex; i < endIndex; i++) {
          const option = options[i];
          const alreadySelectedOption = Array.findById(priorOptions, option.id);
          if (!alreadySelectedOption) {
            newOptions = addInSortedOrder(newOptions, option, options);
          }
        }
        return newOptions;
      });
      addRangeToRecent(startIndex, endIndex);
    };

    const toggleOption = (option: OptionContent) => {
      selectOptions((priorOptions) => {
        const foundIndex = Array.findIndexById(priorOptions, option.id);
        let newOptions;
        if (foundIndex !== -1) {
          newOptions = Array.remove(priorOptions, foundIndex);
          removeSingleFromRecent(option.id);
        } else {
          newOptions = addInSortedOrder(priorOptions, option, options);
          addSingleToRecent(option.id);
        }
        return newOptions;
      });
    };

    const unselectAll = () => {
      selectOptions([]);
      setRecentlySelectedIds([]);
    };

    const handleSpace = (shouldSelectFromRecent: boolean) => {
      const activeIndex = Array.findIndexById(options, activeDescendantId);
      if (activeIndex === -1) {
        return;
      }
      if (shouldSelectFromRecent) {
        if (recentlySelectedIds.length !== 0) {
          const mostRecentId =
            recentlySelectedIds[recentlySelectedIds.length - 1];
          const recentIndex = Array.findIndexById(options, mostRecentId);
          if (recentIndex !== -1) {
            const startIndex = Math.min(activeIndex, recentIndex);
            const endIndex = Math.max(activeIndex, recentIndex);
            selectRange(startIndex, endIndex + 1);
          }
        }
      } else {
        toggleOption(options[activeIndex]);
      }
    };

    const moveActive = (option: OptionContent) => {
      setActiveDescendantId(option.id);
      const optionRef = optionRefsById.current.get(option.id);
      if (list.current && optionRef) {
        scrollToListItem(list.current, optionRef);
      }
    };

    const moveDown = (shouldSelect: boolean) => {
      const foundIndex = Array.findIndexById(options, activeDescendantId);
      if (foundIndex <= options.length - 2) {
        const nextOption = options[foundIndex + 1];
        moveActive(nextOption);
        if (shouldSelect) {
          toggleOption(nextOption);
        }
      }
    };

    const moveEnd = (shouldSelectRange: boolean) => {
      const nextOption = options[options.length - 1];
      moveActive(nextOption);
      if (shouldSelectRange) {
        let startIndex = Array.findIndexById(options, activeDescendantId);
        if (startIndex !== -1) {
          selectRange(startIndex, options.length);
        }
      }
    };

    const moveStart = (shouldSelectRange: boolean) => {
      const nextOption = options[0];
      moveActive(nextOption);
      if (shouldSelectRange) {
        let endIndex = Array.findIndexById(options, activeDescendantId);
        if (endIndex !== -1) {
          selectRange(0, endIndex + 1);
        }
      }
    };

    const moveUp = (shouldSelect: boolean) => {
      const foundIndex = Array.findIndexById(options, activeDescendantId);
      if (foundIndex >= 1) {
        const nextOption = options[foundIndex - 1];
        moveActive(nextOption);
        if (shouldSelect) {
          toggleOption(nextOption);
        }
      }
    };

    const localHandleBlur: FocusEventHandler<HTMLUListElement> = (event) => {
      setActiveDescendantId("");
      if (handleBlur) {
        handleBlur(event);
      }
    };

    const handleFocus: FocusEventHandler<HTMLUListElement> = (event) => {
      if (selectedOptions.length === 0) {
        moveStart(false);
      } else {
        moveActive(selectedOptions[0]);
      }
    };

    const localHandleKeyDown: KeyboardEventHandler<HTMLUListElement> = (
      event
    ) => {
      switch (event.key) {
        case Key.A:
          if (event.ctrlKey) {
            event.preventDefault();
            if (selectedOptions.length !== options.length) {
              selectRange(0, options.length);
            } else {
              unselectAll();
            }
          }
          break;

        case Key.ArrowDown:
          event.preventDefault();
          moveDown(event.shiftKey);
          break;

        case Key.ArrowUp:
          event.preventDefault();
          moveUp(event.shiftKey);
          break;

        case Key.End:
          event.preventDefault();
          moveEnd(event.ctrlKey && event.shiftKey);
          break;

        case Key.Home:
          event.preventDefault();
          moveStart(event.ctrlKey && event.shiftKey);
          break;

        case Key.Space:
          event.preventDefault();
          handleSpace(event.shiftKey);
          break;
      }
      if (handleKeyDown) {
        handleKeyDown(event);
      }
    };

    const handleSelect = (option: OptionContent) => {
      moveActive(option);
      toggleOption(option);
    };

    useEffect(() => {
      if (shouldAutofocus) {
        list.current?.focus();
      }
    }, [shouldAutofocus]);

    useEffect(() => {
      optionRefsById.current.clear();
    }, [options]);

    return (
      <ul
        aria-activedescendant={activeDescendantId}
        aria-labelledby={labelId}
        aria-multiselectable={true}
        className={joinClassNames(classNames.selectList, className)}
        onBlur={localHandleBlur}
        onFocus={handleFocus}
        onKeyDown={localHandleKeyDown}
        ref={handleRef}
        role="listbox"
        tabIndex={tabIndex}
      >
        {options.map((option) => {
          const localHandleOptionRef = (instance: HTMLLIElement | null) => {
            handleOptionRef(instance, option);
          };

          return (
            <Option
              classNames={optionClassNames}
              handleSelect={handleSelect}
              isActive={option.id === activeDescendantId}
              isSelected={!!Array.findById(selectedOptions, option.id)}
              key={option.value}
              state={option}
              ref={localHandleOptionRef}
            />
          );
        })}
      </ul>
    );
  }
);
