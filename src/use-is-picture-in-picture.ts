import { useMatchesDisplayMode } from './use-matches-display-mode';

export const useIsFullscreen = () => {
  return useMatchesDisplayMode('picture-in-picture');
};
