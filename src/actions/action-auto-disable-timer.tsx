import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import { type FC } from 'react';
import { useAutoDisableTimer } from '../context/AutoDisableTimerContext';
import { useAppContext } from '../controller';
import { IconHourglass } from '../icons';
import { ActionButton } from './ActionButton';

export const useActionAutoDisableTimer = () => {
  const { exitFullscreen } = useAppContext();
  const { showDialog } = useAutoDisableTimer();

  return {
    icon: <IconHourglass />,
    title: 'Automatically disable wake lock\u2026',
    onClick: () => {
      exitFullscreen();
      showDialog();
    },
  };
};

export const ActionButtonAutoDisableTimer: FC = () => {
  const { icon, title, onClick } = useActionAutoDisableTimer();
  return <ActionButton title={title} onClick={onClick}>{icon}</ActionButton>;
};

export const ActionMenuItemAutoDisableTimer: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick } = useActionAutoDisableTimer();

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
