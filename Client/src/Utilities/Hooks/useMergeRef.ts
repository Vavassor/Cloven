import { MutableRefObject, useMemo } from "react";

type Ref<T> =
  | ((instance: T | null) => void)
  | MutableRefObject<T | null>
  | null;

function setRef<T>(ref: Ref<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function useMergeRef<T>(a: Ref<T>, b: Ref<T>) {
  return useMemo(() => {
    if (a === null && b === null) {
      return null;
    }
    return (value: T | null) => {
      setRef(a, value);
      setRef(b, value);
    };
  }, [a, b]);
}
