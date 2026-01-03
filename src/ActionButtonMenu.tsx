import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRef, useState, type FC } from 'react';
import { ActionMenu } from './ActionMenu';
import { ActionMenuDialog } from './ActionMenuDialog';
import { ActionButton } from './actions/ActionButton';
import { IconMenu } from './icons';

export const ActionButtonMenu: FC = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.only('xs'));
  const [open, setOpen] = useState(false);

  return (
    <>
      {
        isExtraSmall ?
          <ActionMenuDialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          /> :
          <ActionMenu
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            anchorRef={ref}
          />
      }

      <ActionButton
        ref={ref}
        title="Actions&hellip;"
        onClick={() => {
          setOpen(true);
        }}
      >
        <IconMenu />
      </ActionButton>
    </>
  );
};
