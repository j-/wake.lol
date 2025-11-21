import { useCallback, type FC } from 'react';
import { useDocument } from '../context/WindowContext';
import { IconColorSwatch } from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonBlackScreen: FC = () => {
  const document = useDocument();

  const handleClick = useCallback(() => {
    const div = document.createElement('div');
    div.style.backgroundColor = 'black';
    document.body.appendChild(div);
    div.requestFullscreen();
    const handleChange = () => {
      if (document.fullscreenElement === div) return;
      document.body.removeChild(div);
      document.removeEventListener('fullscreenchange', handleChange);
    };
    document.addEventListener('fullscreenchange', handleChange);
  }, [document]);

  return (
    <ActionButton
      title="Make screen black"
      onClick={handleClick}
    >
      <IconColorSwatch fill="#0006" />
    </ActionButton>
  );
};
