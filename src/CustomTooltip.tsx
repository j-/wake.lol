import { useTheme } from '@mui/material/styles';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { cloneElement, type ReactElement, type FC } from 'react';
import { useTooltipContainer } from './use-tooltip-container';

export type CustomTooltipProps = TooltipProps & {
  children: ReactElement<{ title?: string }>;
};

export const CustomTooltip: FC<CustomTooltipProps> = ({
  title,
  slotProps,
  children,
  ...props
}) => {
  const theme = useTheme();
  const shouldUseNativeTooltip = useMediaQuery(theme.breakpoints.only('xs'));
  const tooltipContainer = useTooltipContainer();

  if (shouldUseNativeTooltip) {
    return cloneElement(children, {
      title: typeof title === 'string' ? title : '',
    });
  }

  return (
    <Tooltip
      title={title}
      slotProps={{
        ...slotProps,
        popper: {
          ...slotProps?.popper,
          container: tooltipContainer,
        },
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};
