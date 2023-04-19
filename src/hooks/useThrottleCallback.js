import { useCallback, useEffect, useRef } from 'react';

const useThrottleCallback = (callback, delay, eventType) => {
  const throttleRef = useRef(null);

  const throttledCallback = useCallback(
    e => {
      if (!throttleRef.current) {
        throttleRef.current = true;
        callback(e);
        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );

  useEffect(() => {
    if (eventType) {
      window.addEventListener(eventType, throttledCallback, { passive: false });
      return () => {
        window.removeEventListener(eventType, throttledCallback);
      };
    }
  }, [eventType, throttledCallback]);

  return throttledCallback;
}

export default useThrottleCallback;
