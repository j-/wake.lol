import GlobalStyles from '@mui/material/GlobalStyles';
import type { FC } from 'react';
import { useAppContext } from './controller';

const globalStyles = (
  <GlobalStyles
    styles={{
      ':root': { cursor: 'none' },
    }}
  />
);

export const HideCursorOnIdle: FC = () => {
  const { isIdle, isFullyVisible } = useAppContext();

  return isIdle && isFullyVisible ? globalStyles : null;
};
