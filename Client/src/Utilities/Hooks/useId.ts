import { useRef } from "react";

let uniqueId = 0;
export const getUniqueId = (): number => {
  return uniqueId++;
};

/**
 * Create a unique ID to use for HTML attributes that require an ID reference,
 * such as the label element.
 * 
 * <label for="use-id-here">
 * 
 * Warning: These IDs are unstable depending on the render order of components
 * that use this hook. They should not be relied on to generate in a particular
 * order, or the same ID for the same element.
 * 
 * @param prefix added to the beginning of the id to make it more readable
 * @returns a unique ID
 */
export const useId = (prefix = "PF"): string => {
  const idRef = useRef<number | null>(null);
  if (idRef.current === null) {
    idRef.current = getUniqueId();
  }
  return `${prefix}-${idRef.current}`;
};