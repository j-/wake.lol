import Box from '@mui/material/Box';
import { useMemo, useRef, type FC, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useFullscreen } from '../../controller/use-fullscreen';
import { HideCursorOnIdle } from '../../HideCursorOnIdle';
import { useBody } from '../WindowContext';
import { BlackScreenContext, type BlackScreenContextType } from './context';

export type BlackScreenProviderProps = PropsWithChildren;

export const BlackScreenProvider: FC<BlackScreenProviderProps> = ({
  children,
}) => {
  const body = useBody();
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const {
    isFullscreen: isBlackScreenShown,
    requestFullscreen: showBlackScreen,
    exitFullscreen: hideBlackScreen,
  } = useFullscreen({
    fullscreenRef,
  });

  const blackElement = (
    <Box
      ref={fullscreenRef}
      sx={{
        backgroundColor: 'black',
      }}
      onDoubleClick={hideBlackScreen}
    >
      <HideCursorOnIdle />
    </Box>
  );

  const value = useMemo<BlackScreenContextType>(() => ({
    isBlackScreenShown,
    showBlackScreen,
    hideBlackScreen,
  }), [
    isBlackScreenShown,
    showBlackScreen,
    hideBlackScreen,
  ]);

  return (
    <BlackScreenContext value={value}>
      {createPortal(blackElement, body)}
      {children}
    </BlackScreenContext>
  );
};
