import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { useAppContext } from '../controller';
import { IconExpandCollapse } from '../icons';
import { ActionButton } from './ActionButton';

export const useActionExpandCollapse = () => {
  const { isExpanded, toggleExpandCollapseUI } = useAppContext();

  return {
    icon: <IconExpandCollapse isExpanded={isExpanded} />,
    title: isExpanded ? 'Collapse UI' : 'Expand UI',
    hotkey: 't',
    onClick: toggleExpandCollapseUI,
  };
};

export const ActionButtonExpandCollapse: FC = () => {
  const { icon, title, onClick, hotkey } = useActionExpandCollapse();
  return (
    <ActionButton title={`${title} [${hotkey}`} onClick={onClick}>
      {icon}
    </ActionButton>
  );
};

export const ActionMenuItemExpandCollapse: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick, hotkey } = useActionExpandCollapse();

  return (
    <MenuItem onClick={(e) => {
      onClick();
      onClickProp?.(e);
    }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {hotkey}
      </Typography>
    </MenuItem>
  );
};
