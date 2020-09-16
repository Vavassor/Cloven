import { useCallback, useLayoutEffect, useRef } from "react";

export function useEventCallback<T extends Function>(callback: T) {
  const ref = useRef<T>();
  useLayoutEffect(() => {
    ref.current = callback;
  });
  return useCallback((...args) => {
    const call = ref.current as T;
    return call(...args);
  }, []);
}
