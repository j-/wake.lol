import { useTheme } from '@mui/material/styles';
import { useCallback, useRef, useState, type FC } from 'react';
import { ActionMenu } from './ActionMenu';
import { ActionMenuDialog } from './ActionMenuDialog';
import { ActionButton } from './actions/ActionButton';
import { IconMenu } from './icons';
import { useActionMenuItems } from './use-action-menu-items';
import { useMediaQuery } from './use-media-query';

export const ActionButtonMenu: FC = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.only('xs'));
  const [open, setOpen] = useState(false);

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const items = useActionMenuItems({ onClose });

  if (!items.length) {
    return null;
  }

  return (
    <>
      {
        isExtraSmall ?
          <ActionMenuDialog
            open={open}
            onClose={onClose}
            children={items}
          /> :
          <ActionMenu
            open={open}
            onClose={onClose}
            children={items}
            anchorRef={ref}
          />
      }

      <ActionButton
        ref={ref}
        title="Actions&hellip;"
        onClick={onClick}
      >
        <IconMenu />
      </ActionButton>
    </>
  );
};
