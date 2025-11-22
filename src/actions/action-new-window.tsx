import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { IconAppWindowPlatform } from '../icons';
import { useNewWindowOpener } from '../use-new-window-opener';
import { ActionButton } from './ActionButton';

export const useActionNewWindow = () => {
  const { openNewWindow } = useNewWindowOpener();

  return {
    icon: <IconAppWindowPlatform />,
    title: 'Open in new window',
    hotkey: 'n',
    onClick: openNewWindow,
  };
};

export const ActionButtonNewWindow: FC = () => {
  const { icon, title, onClick, hotkey } = useActionNewWindow();
  return (
    <ActionButton title={`${title} [${hotkey}]`} onClick={onClick}>
      {icon}
    </ActionButton>
  );
};

export const ActionMenuItemNewWindow: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick, hotkey } = useActionNewWindow();

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
