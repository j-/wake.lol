import { useEffect, useState } from 'react';

export const useIsInitialized = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return isInitialized;
};
