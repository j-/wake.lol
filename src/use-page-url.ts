import { BASE_URL } from './constants';
import { useIsInitialized } from './use-is-initialized';

export const usePageUrl = () => {
  const isInitialized = useIsInitialized();
  return isInitialized ? new URL(window.location.href) : new URL(BASE_URL);
};
