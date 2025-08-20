import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';

export const useIsIdle = () => {
  const [isIdle, setIsIdle] = useState(false);

  useIdleTimer({
    timeout: 5_000,
    throttle: 500,
    onIdle: () => setIsIdle(true),
    onActive: () => setIsIdle(false),
  });

  return isIdle;
};
