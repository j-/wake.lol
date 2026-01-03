import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import { type TooltipProps } from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/system';
import { type FC } from 'react';
import { useAppContext } from '../controller';
import { CustomTooltip } from '../CustomTooltip';

export type ActionButtonProps = IconButtonProps & {
  title: TooltipProps['title'];
};

export const ActionButton: FC<ActionButtonProps> = ({ title, ...props }) => {
  const {
    isExpanded,
    isFullyVisible,
    isIdle,
  } = useAppContext();

  const buttonStyle: IconButtonProps['sx'] = {
    opacity: isIdle && isFullyVisible || isIdle && isExpanded ? 0.25 : 1,
    transition: 'opacity 200ms ease-in-out, background-color 100ms ease-out',
    color: 'inherit',
    '&:hover': {
      opacity: 1,
      backgroundColor: '#0002',
    },
    '& svg': {
      transition: 'all 200ms ease-in-out',
    },
  };

  const consumerSx = props.sx;
  const mergedSx: SxProps<Theme> =
    consumerSx ?
      ([buttonStyle, consumerSx] as SxProps<Theme>) :
      (buttonStyle as SxProps<Theme>);

  return (
    <CustomTooltip title={title}>
      <IconButton sx={mergedSx} size="large" {...props} />
    </CustomTooltip>
  );
};
