import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useBody } from '../context/WindowContext';

export const useIsIdle = () => {
  const body = useBody();
  const [isIdle, setIsIdle] = useState(false);

  useIdleTimer({
    element: body,
    timeout: 5_000,
    throttle: 500,
    onIdle: () => setIsIdle(true),
    onActive: () => setIsIdle(false),
  });

  return isIdle;
};
