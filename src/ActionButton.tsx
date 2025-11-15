import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/system';
import { type FC } from 'react';
import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';

export type ActionButtonProps = IconButtonProps & {
  title: TooltipProps['title'];
};

export const ActionButton: FC<ActionButtonProps> = ({ title, ...props }) => {
  const document = useDocument();

  const {
    isExpanded,
    isFullyVisible,
    isIdle,
  } = useAppContext();

  const buttonStyle: IconButtonProps['sx'] = {
    opacity: isIdle && isFullyVisible || isIdle && isExpanded ? 0.25 : 1,
    transition: 'opacity 200ms ease-in-out',
    color: 'inherit',
    '&:hover': {
      opacity: 1,
    },
  };

  const tooltipSlotProps: TooltipProps['slotProps'] = {
    popper: {
      container: document.fullscreenElement ?? document.body,
    },
  };

  const consumerSx = props.sx;
  const mergedSx: SxProps<Theme> =
    consumerSx ?
      ([buttonStyle, consumerSx] as SxProps<Theme>) :
      (buttonStyle as SxProps<Theme>);

  return (
    <Tooltip
      title={title}
      slotProps={tooltipSlotProps}
    >
      <IconButton sx={mergedSx} size="large" {...props} />
    </Tooltip>
  );
};
