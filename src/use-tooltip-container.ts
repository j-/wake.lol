import { useBody } from './context/WindowContext';
import { useFullScreenElement } from './use-full-screen-element';

export const useTooltipContainer = () => {
  const body = useBody();
  const fullscreenElement = useFullScreenElement();

  return fullscreenElement ?? body;
};
