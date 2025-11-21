import { useCallback, type FC } from 'react';
import { flushSync } from 'react-dom';
import { ID_BELOW_THE_FOLD } from '../constants';
import { useDocument } from '../context/WindowContext';
import { useAppContext } from '../controller';
import { IconEllipsis } from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonScroll: FC = () => {
  const document = useDocument();
  const { collapseUI } = useAppContext();

  const handleClick = useCallback(() => {
    flushSync(() => collapseUI());
    document.getElementById(ID_BELOW_THE_FOLD)
      ?.scrollIntoView({ behavior: 'smooth' });
  }, [collapseUI, document]);

  return (
    <ActionButton
      title="More info and settings"
      onClick={handleClick}
    >
      <IconEllipsis />
    </ActionButton>
  );
};
