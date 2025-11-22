import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { useAppContext } from '../controller';
import { IconMaximizeMinimize } from '../icons';
import { ActionButton } from './ActionButton';

export const useActionFullscreen = () => {
  const { isFullscreen, toggleFullscreen } = useAppContext();

  return {
    icon: <IconMaximizeMinimize isMaximized={isFullscreen} />,
    title: isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen',
    hotkey: 'f',
    onClick: toggleFullscreen,
  };
};

export const ActionButtonFullscreen: FC = () => {
  const { icon, title, onClick, hotkey } = useActionFullscreen();
  return (
    <ActionButton title={`${title} [${hotkey}]`} onClick={onClick}>
      {icon}
    </ActionButton>
  );
};

export const ActionMenuItemFullscreen: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick, hotkey } = useActionFullscreen();

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
