import { useBody } from './context/WindowContext';
import { useFullscreenElement } from './fullscreen/use-fullscreen-element';

export const useTooltipContainer = () => {
  const body = useBody();
  const fullscreenElement = useFullscreenElement();

  return fullscreenElement ?? body;
};
