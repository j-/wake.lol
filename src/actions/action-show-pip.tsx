import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { usePictureInPictureOpener } from '../context/PictureInPictureOpenerContext';
import { IconPictureInPicture } from '../icons';
import { ActionButton } from './ActionButton';

export const useActionShowPiP = () => {
  const { openPictureInPictureWindow } = usePictureInPictureOpener();

  return {
    icon: <IconPictureInPicture />,
    title: 'Open in picture-in-picture window',
    hotkey: 'p',
    onClick: () => openPictureInPictureWindow(),
  };
};

export const ActionButtonShowPiP: FC = () => {
  const { icon, title, onClick, hotkey } = useActionShowPiP();
  return (
    <ActionButton title={`${title} [${hotkey}]`} onClick={onClick}>
      {icon}
    </ActionButton>
  );
};

export const ActionMenuItemShowPiP: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick, hotkey } = useActionShowPiP();

  return (
    <MenuItem onClick={(e) => {
      onClick();
      onClickProp?.(e);
    }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Typography variant="inherit" noWrap>
          {title}
        </Typography>
      </ListItemText>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {hotkey}
      </Typography>
    </MenuItem>
  );
};
