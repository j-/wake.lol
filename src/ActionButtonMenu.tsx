import { useRef, useState, type FC } from 'react';
import { ActionMenu } from './ActionMenu';
import { ActionButton } from './actions/ActionButton';
import { IconMenu } from './icons';

export const ActionButtonMenu: FC = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionMenu
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchorRef={ref}
      />

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
