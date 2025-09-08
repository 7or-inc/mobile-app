import { useCallback, useEffect, useRef, useState } from 'react';

interface CountDownOptions {
  onComplete?: () => void;
  startOnMount?: boolean;
  intervalMs?: number;
}

export const useCountDown = (
  initialCount: number,
  { onComplete, startOnMount = true, intervalMs }: CountDownOptions = {}
) => {
  const [count, setCount] = useState(initialCount);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          stop();
          onComplete?.();
          return 0;
        }

        return prevCount - 1;
      });
    }, intervalMs ?? 1000);
  }, [intervalMs, onComplete, stop]);

  const reset = useCallback(
    (newCount: number = initialCount) => {
      stop();
      setCount(newCount);
    },
    [initialCount, stop]
  );
  const restart = useCallback(() => {
    reset();
    start();
  }, [reset, start]);

  useEffect(() => {
    if (startOnMount) start();

    return stop;
  }, [start, startOnMount, stop]);

  return { count, start, reset, stop, restart, isRunning: !!intervalRef.current };
};
