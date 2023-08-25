import { useMemo } from 'react';
import { PARAM_STANDALONE } from './constants';
import { usePageUrl } from './use-page-url';

export const useIsStandalone = () => {
  const pageUrl = usePageUrl();

  return useMemo(() => {
    return pageUrl.searchParams.has(PARAM_STANDALONE);
  }, [pageUrl]);
};
