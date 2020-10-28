import { MountOptions } from "./ModalManager";
import { getOwnerDocument, getOwnerWindow } from "../../Utilities/Owner";

export type RestoreStyle = () => void;

export interface StyleRecord {
  element: HTMLElement;
  key: string;
  value: string;
}

const addOverflowHidden = (
  container: HTMLElement,
  styleRecords: StyleRecord[]
) => {
  const parent = container.parentElement;
  const scrollContainer =
    parent &&
    parent.nodeName === "HTML" &&
    window.getComputedStyle(parent).overflowY === "scroll"
      ? parent
      : container;
  const overflow: StyleRecord = {
    element: scrollContainer,
    key: "overflow",
    value: scrollContainer.style.overflow,
  };
  styleRecords.push(overflow);
  scrollContainer.style.overflow = "hidden";
};

const addPaddingRight = (
  container: HTMLElement,
  styleRecords: StyleRecord[]
) => {
  const scrollbarWidth = getScrollbarWidth();
  const paddingRight: StyleRecord = {
    element: container,
    key: "padding-right",
    value: container.style.paddingRight,
  };
  styleRecords.push(paddingRight);
  container.style.paddingRight = `${
    getPaddingRight(container) + scrollbarWidth
  }px`;
};

const getPaddingRight = (element: Element) => {
  const computedStyle = window.getComputedStyle(element);
  return parseInt(computedStyle.paddingRight, 10) || 0;
};

/** Uses David Walsh's method to detect scrollbar width. */
const getScrollbarWidth = () => {
  const measureDiv = document.createElement("div");
  measureDiv.style.height = "99px";
  measureDiv.style.overflow = "scroll";
  measureDiv.style.position = "absolute";
  measureDiv.style.top = "-9999px";
  measureDiv.style.width = "99px";
  document.body.appendChild(measureDiv);
  const scrollbarWidth = measureDiv.offsetWidth - measureDiv.clientWidth;
  document.body.removeChild(measureDiv);
  return scrollbarWidth;
};

const hasVerticalScrollbar = (container: Element) => {
  const ownerDocument = getOwnerDocument(container);
  if (ownerDocument.body === container) {
    const ownerWindow = getOwnerWindow(ownerDocument);
    return ownerWindow.innerWidth > ownerDocument.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
};

export const lockScroll = (
  container: HTMLElement,
  mountOptions: MountOptions
): RestoreStyle => {
  const styleRecords: StyleRecord[] = [];

  if (mountOptions.shouldLockScroll) {
    if (hasVerticalScrollbar(container)) {
      addPaddingRight(container, styleRecords);
    }
    addOverflowHidden(container, styleRecords);
  }

  const restoreStyle: RestoreStyle = () => {
    styleRecords.forEach(({ element, key, value }) => {
      if (value) {
        element.style.setProperty(key, value);
      } else {
        element.style.removeProperty(key);
      }
    });
  };

  return restoreStyle;
};
