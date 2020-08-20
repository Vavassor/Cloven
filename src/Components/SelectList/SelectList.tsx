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
import { Option, OptionClassNames } from "./Option";
import styles from "./SelectList.module.scss";

const SEARCH_DURATION_IN_MILLISECONDS = 500;

export interface SelectListClassNames {
  selectList: string;
}

export interface SelectListProps {
  autoFocus?: boolean;
  className?: string;
  classNames?: SelectListClassNames;
  handleBlur?: FocusEventHandler<HTMLUListElement>;
  handleKeyDown?: KeyboardEventHandler<HTMLUListElement>;
  handleSelectionChange: (
    selectedOption: OptionContent,
    wasClicked: boolean
  ) => void;
  labelId: string;
  optionClassNames?: OptionClassNames;
  options: OptionContent[];
  selectedOption: OptionContent;
}

export interface OptionContent {
  id: string;
  label: string;
  value: string;
}

interface Search {
  priorTime: number;
  query: string;
}

const defaultClassNames: SelectListClassNames = {
  selectList: styles.selectList,
};

const findMatchInRange = (
  options: OptionContent[],
  startIndex: number,
  endIndex: number,
  query: string
): OptionContent | null => {
  for (let i = startIndex; i < endIndex; i++) {
    const optionState = options[i];
    const { label } = optionState;
    if (label.toLowerCase().indexOf(query) === 0) {
      return optionState;
    }
  }
  return null;
};

export const SelectList = forwardRef<HTMLUListElement, SelectListProps>(
  function SelectList(
    {
      autoFocus,
      className,
      classNames = defaultClassNames,
      handleBlur,
      handleKeyDown,
      handleSelectionChange,
      labelId,
      optionClassNames,
      options,
      selectedOption,
    },
    ref
  ) {
    const list = useRef<HTMLUListElement | null>(null);
    const handleRef = useMergeRef(list, ref);
    const [search, setSearch] = useState<Search>({
      priorTime: 0,
      query: "",
    });
    const optionRefsById = useRef<Map<string, HTMLLIElement>>(new Map());

    const handleOptionRef = (
      instance: HTMLLIElement | null,
      option: OptionContent
    ) => {
      if (instance) {
        optionRefsById.current.set(option.id, instance);
      }
    };

    const selectOption = (option: OptionContent, wasClicked?: boolean) => {
      handleSelectionChange(option, !!wasClicked);
      const optionRef = optionRefsById.current.get(option.id);
      if (list.current && optionRef) {
        scrollToListItem(list.current, optionRef);
      }
    };

    const moveDown = () => {
      const foundIndex = Array.findIndexById(options, selectedOption.id);
      if (foundIndex <= options.length - 2) {
        const nextOption = options[foundIndex + 1];
        selectOption(nextOption);
      }
    };

    const moveEnd = () => {
      const nextOption = options[options.length - 1];
      selectOption(nextOption);
    };

    const moveStart = () => {
      const nextOption = options[0];
      selectOption(nextOption);
    };

    const moveUp = () => {
      const foundIndex = Array.findIndexById(options, selectedOption.id);
      if (foundIndex >= 1) {
        const nextOption = options[foundIndex - 1];
        selectOption(nextOption);
      }
    };

    const updateSearch = (key: string, timestamp: number) => {
      setSearch((priorSearch) => {
        let { query } = priorSearch;
        const searchIndex = !query
          ? Array.findIndexById(options, selectedOption.id)
          : 0;
        if (timestamp - search.priorTime > SEARCH_DURATION_IN_MILLISECONDS) {
          query = "";
        }
        query += key;
        let nextMatch = findMatchInRange(
          options,
          searchIndex + 1,
          options.length,
          query
        );
        if (!nextMatch) {
          nextMatch = findMatchInRange(options, 0, searchIndex + 1, query);
        }
        if (nextMatch) {
          selectOption(nextMatch);
        }
        return { priorTime: timestamp, query };
      });
    };

    const handleFocus: FocusEventHandler<HTMLUListElement> = () => {
      selectOption(selectedOption);
    };

    const localHandleKeyDown: KeyboardEventHandler<HTMLUListElement> = (
      event
    ) => {
      switch (event.key) {
        case Key.ArrowDown:
          event.preventDefault();
          moveDown();
          break;

        case Key.ArrowUp:
          event.preventDefault();
          moveUp();
          break;

        case Key.End:
          event.preventDefault();
          moveEnd();
          break;

        case Key.Home:
          event.preventDefault();
          moveStart();
          break;

        default:
          updateSearch(event.key, event.timeStamp);
          break;
      }
      if (handleKeyDown) {
        handleKeyDown(event);
      }
    };

    useEffect(() => {
      if (autoFocus) {
        list.current?.focus();
      }
    }, [autoFocus]);

    useEffect(() => {
      optionRefsById.current.clear();
    }, [options]);

    return (
      <ul
        aria-activedescendant={selectedOption.id}
        aria-labelledby={labelId}
        className={joinClassNames(classNames.selectList, className)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={localHandleKeyDown}
        ref={handleRef}
        role="listbox"
        tabIndex={0}
      >
        {options.map((option) => {
          const handleRef = (instance: HTMLLIElement | null) => {
            handleOptionRef(instance, option);
          };

          return (
            <Option
              classNames={optionClassNames}
              content={option}
              handleSelect={selectOption}
              isSelected={option.id === selectedOption.id}
              key={option.id}
              ref={handleRef}
            />
          );
        })}
      </ul>
    );
  }
);
