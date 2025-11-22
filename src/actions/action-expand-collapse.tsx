import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import { type FC } from 'react';
import { useAppContext } from '../controller';
import { IconExpandCollapse } from '../icons';
import { ActionButton } from './ActionButton';

export const useActionExpandCollapse = () => {
  const { isExpanded, toggleExpandCollapseUI } = useAppContext();

  return {
    icon: <IconExpandCollapse isExpanded={isExpanded} />,
    title: isExpanded ? 'Collapse UI [t]' : 'Expand UI [t]',
    onClick: toggleExpandCollapseUI,
  };
};

export const ActionButtonExpandCollapse: FC = () => {
  const { icon, title, onClick } = useActionExpandCollapse();
  return <ActionButton title={title} onClick={onClick}>{icon}</ActionButton>;
};

export const ActionMenuItemExpandCollapse: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick } = useActionExpandCollapse();

  return (
    <MenuItem onClick={(e) => {
      onClick();
      onClickProp?.(e);
    }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  );
};
