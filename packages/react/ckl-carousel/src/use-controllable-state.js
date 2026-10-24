import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Custom hook to manage controlled vs uncontrolled component state in React
 * without unnecessary re-renders or double-render cycles.
 *
 * @template T
 * @param {Object} options
 * @param {T} [options.value] - Controlled value from props
 * @param {T} [options.defaultValue] - Initial value when uncontrolled
 * @param {(value: T) => void} [options.onChange] - Callback fired when value updates
 * @returns {[T, (next: T | ((prev: T) => T)) => void]}
 */
export function useControllableState({ value, defaultValue, onChange }) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const setValue = useCallback(
    (next) => {
      const nextValue = typeof next === "function" ? next(currentValue) : next;
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChangeRef.current?.(nextValue);
    },
    [isControlled, currentValue],
  );

  return [currentValue, setValue];
}
