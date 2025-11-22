import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type FC } from 'react';
import { ActionButtonList } from './ActionButtonList';
import { ActionButtonMenu } from './ActionButtonMenu';
import { ActionButtonBlackScreen } from './actions/action-black-screen';
import { ActionButtonWakeLock } from './actions/ActionButtonWakeLock';
import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';

export const Actions: FC = () => {
  const document = useDocument();
  const theme = useTheme();
  const isSmallOrUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { isFullscreen } = useAppContext();
  const buttonWakeLock = <ActionButtonWakeLock />;

  const showButtonBlackScreen = (
    !isFullscreen &&
    typeof document.body.requestFullscreen === 'function'
  );

  const buttonBlackScreen = showButtonBlackScreen ? (
    <ActionButtonBlackScreen />
  ) : null;

  return (
    <Stack
      direction="row"
      gap={4}
      alignItems="start"
      data-test-id="Actions"
      m={-1}
    >
      <Stack
        direction="row"
        lineHeight={1}
        gap={{ xs: 0, sm: 1 }}
        alignContent="start"
      >
        {buttonWakeLock}
        {buttonBlackScreen}
      </Stack>

      <Stack
        direction="row-reverse"
        lineHeight={1}
        gap={{ xs: 0, sm: 1 }}
        ml="auto"
        flexWrap="wrap"
        justifyContent="end"
      >
        {isSmallOrUp ? <ActionButtonList /> : <ActionButtonMenu />}
      </Stack>
    </Stack>
  );
};
