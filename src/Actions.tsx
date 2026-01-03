import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { type FC } from 'react';
import { ActionButtonList } from './ActionButtonList';
import { ActionButtonMenu } from './ActionButtonMenu';
import { ActionButtonBlackScreen } from './actions/action-black-screen';
import { ActionButtonWakeLock } from './actions/ActionButtonWakeLock';
import { useMediaQuery } from './use-media-query';
import { useShowButtonBlackScreen } from './use-show-button-black-screen';

export const Actions: FC = () => {
  const theme = useTheme();
  const isSmallOrUp = useMediaQuery(theme.breakpoints.up('sm'));
  const buttonWakeLock = <ActionButtonWakeLock />;

  const showButtonBlackScreen = useShowButtonBlackScreen();
  const buttonBlackScreen = showButtonBlackScreen ? (
    <ActionButtonBlackScreen />
  ) : null;

  return (
    <Stack
      direction="row"
      gap={{
        xs: 0,
        sm: 2,
        md: 4,
      }}
      alignItems="start"
      m={-1}
      data-testId="Actions"
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
