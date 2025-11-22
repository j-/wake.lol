import { type FC } from 'react';
import { useBlackScreen } from '../context/BlackScreenContext';
import { IconColorSwatch } from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonBlackScreen: FC = () => {
  const { showBlackScreen } = useBlackScreen();

  return (
    <ActionButton
      title="Make screen black"
      onClick={showBlackScreen}
    >
      <IconColorSwatch fill="#0006" />
    </ActionButton>
  );
};
