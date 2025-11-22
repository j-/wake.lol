import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import { type FC } from 'react';
import { useBlackScreen } from '../context/BlackScreenContext';
import { IconColorSwatch } from '../icons';
import { ActionButton } from './ActionButton';

export const useActionBlackScreen = () => {
  const { showBlackScreen } = useBlackScreen();

  return {
    icon: <IconColorSwatch fill="#0006" />,
    title: 'Make screen black',
    onClick: showBlackScreen,
  };
};

export const ActionButtonBlackScreen: FC = () => {
  const { icon, title, onClick } = useActionBlackScreen();
  return <ActionButton title={title} onClick={onClick}>{icon}</ActionButton>;
};

export const ActionMenuItemBlackScreen: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick } = useActionBlackScreen();

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
