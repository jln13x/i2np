import { useRef } from 'react';

export const useDebounce = () => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debounce = (cb: () => void, delay: number = 100) => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => cb(), delay);
  };

  return debounce;
};
