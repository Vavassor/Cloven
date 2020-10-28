interface MutableRefObject<T> {
  current: T;
}

export type ForwardedRef<T> =
  | ((instance: T | null) => void)
  | MutableRefObject<T | null>
  | null;

export function setRef<T>(ref: ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
