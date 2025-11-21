import { type FC } from 'react';
import { useAppContext } from '../controller';
import { IconExpandCollapse } from '../icons';
import { ActionButton } from './ActionButton';

export const ActionButtonExpandCollapse: FC = () => {
  const { isExpanded, toggleExpandCollapseUI } = useAppContext();

  return (
    <ActionButton
      title={isExpanded ? 'Collapse UI [t]' : 'Expand UI [t]'}
      onClick={toggleExpandCollapseUI}
    >
      <IconExpandCollapse isExpanded={isExpanded} />
    </ActionButton>
  );
};
