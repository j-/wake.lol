import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import { useMemo, type FC } from 'react';
import { useBattery } from '../context/BatteryManagerContext';
import { useOpener } from '../context/WindowContext';
import { IconBattery } from '../icons';
import { ActionButton } from './ActionButton';

const formatCharging = (charging: boolean) =>
  charging ? 'charging' : 'discharging';

const formatLevel = (level: number) => Math.ceil(level * 100) + '%';

const formatBattery = ({
  charging,
  level,
}: {
  charging: boolean | null;
  level: number | null;
}) => {
  const chargingLabel = charging == null ?
    'status unknown' :
    formatCharging(charging);

  const levelLabel = level == null ?
    'level unknown' :
    formatLevel(level);

  return `Battery ${chargingLabel} (${levelLabel})`;
};

export const useActionButtonBattery = () => {
  const opener = useOpener();

  const {
    charging = null,
    level = null,
  } = useBattery() ?? {};

  const title = useMemo(() => {
    return formatBattery({
      charging,
      level,
    });
  }, [charging, level]);

  return {
    icon:  <IconBattery charging={charging ?? false} level={level ?? 1} />,
    title,
    onClick: () => opener?.focus(),
  };
};

export const ActionButtonBattery: FC = () => {
  const { icon, title, onClick } = useActionButtonBattery();
  return <ActionButton title={title} onClick={onClick}>{icon}</ActionButton>;
};

export const ActionMenuItemBattery: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick } = useActionButtonBattery();

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
