import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { type MenuItemProps } from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useCallback, type FC } from 'react';
import { flushSync } from 'react-dom';
import { ID_BELOW_THE_FOLD } from '../constants';
import { useDocument } from '../context/WindowContext';
import { useAppContext } from '../controller';
import { IconEllipsis } from '../icons';
import { ActionButton } from './ActionButton';

export const useActionScroll = () => {
  const document = useDocument();
  const { collapseUI } = useAppContext();

  const onClick = useCallback(() => {
    flushSync(() => collapseUI());
    document.getElementById(ID_BELOW_THE_FOLD)
      ?.scrollIntoView({ behavior: 'smooth' });
  }, [collapseUI, document]);

  return {
    icon: <IconEllipsis />,
    title: 'More info and settings',
    onClick,
  };
};

export const ActionButtonScroll: FC = () => {
  const { icon, title, onClick } = useActionScroll();
  return <ActionButton title={title} onClick={onClick}>{icon}</ActionButton>;
};

export const ActionMenuItemScroll: FC<
  MenuItemProps
> = ({
  onClick: onClickProp,
}) => {
  const { icon, title, onClick } = useActionScroll();

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
    </MenuItem>
  );
};
