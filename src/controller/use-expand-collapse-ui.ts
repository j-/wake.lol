import { useCallback, useMemo } from 'react';
import { usePreferences } from './use-preferences';

export type ExpandUI = () => void;
export type CollapseUI = () => void;
export type ToggleExpandCollapseUI = () => void;

export type UseExpandCollapseUI = () => UseExpandCollapseResult;

export type UseExpandCollapseResult = {
  isExpanded: boolean;
  expandUI: ExpandUI;
  collapseUI: CollapseUI;
  toggleExpandCollapseUI: ToggleExpandCollapseUI;
};

export const useExpandCollapseUI: UseExpandCollapseUI = () => {
  const {
    shouldExpandUI: isExpanded,
    setShouldExpandUI: setIsExpanded,
  } = usePreferences();

  const expandUI = useCallback(() => {
    setIsExpanded(true);
  }, [setIsExpanded]);

  const collapseUI = useCallback(() => {
    setIsExpanded(false);
  }, [setIsExpanded]);

  const toggleExpandCollapseUI = useCallback(() => {
    setIsExpanded((isExpanded) => !isExpanded);
  }, [setIsExpanded]);

  const result = useMemo<UseExpandCollapseResult>(() => ({
    isExpanded,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
  }), [
    isExpanded,
    expandUI,
    collapseUI,
    toggleExpandCollapseUI,
  ]);

  return result;
};
