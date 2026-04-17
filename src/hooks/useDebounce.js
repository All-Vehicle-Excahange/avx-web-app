import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/**
 * useDebounceValue - Debounces a value (perfect for search inputs)
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in ms
 * @returns {any} - The debounced value
 */
export function useDebounceValue(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback - Debounces a function execution
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function} - The debounced function
 */
export function useDebouncedCallback(callback, delay = 500) {
  const timer = useRef(null);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const debouncedFunc = useMemo(() => {
    const fn = (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };

    fn.cancel = cancel;
    return fn;
  }, [callback, delay, cancel]);

  return debouncedFunc;
}
