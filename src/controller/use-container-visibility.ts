import { useEffect, useMemo, useState } from 'react';

export type UseContainerVisibility =
  (params: UseContainerVisibilityParams) => UseContainerVisibilityResult;

export type UseContainerVisibilityParams = {
  containerRef: React.RefObject<HTMLElement | null>;
  enableContainerVisibility: boolean;
};

export type UseContainerVisibilityResult = {
  isFullyVisible: boolean;
};

export const useContainerVisibility: UseContainerVisibility = ({
  containerRef,
  enableContainerVisibility,
}) => {
  const [isFullyVisible, setIsFullyVisible] =
    useState(enableContainerVisibility);

  const result = useMemo<UseContainerVisibilityResult>(() => ({
    isFullyVisible,
  }), [
    isFullyVisible,
  ]);

  useEffect(() => {
    if (!enableContainerVisibility) return;

    const element = containerRef.current;
    if (!element) return;

    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setIsFullyVisible(entry.intersectionRatio >= 0.95);
    }, {
      root: null,
      threshold: [1, 0.95],
    });

    io.observe(element);

    return () => {
      io.disconnect();
    };
  }, [containerRef, enableContainerVisibility]);

  return result;
};
