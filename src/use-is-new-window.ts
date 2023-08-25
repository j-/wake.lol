import { useMemo } from 'react';
import { PARAM_NEW_WINDOW } from './constants';
import { usePageUrl } from './use-page-url';

export const useIsNewWindow = () => {
  const pageUrl = usePageUrl();

  return useMemo(() => {
    return pageUrl.searchParams.has(PARAM_NEW_WINDOW);
  }, [pageUrl]);
};
