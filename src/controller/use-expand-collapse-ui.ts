import { useCallback, useMemo, useState } from 'react';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const expandUI = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapseUI = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const toggleExpandCollapseUI = useCallback(() => {
    setIsExpanded((isExpanded) => !isExpanded);
  }, []);

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
