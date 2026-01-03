import { useTheme } from '@mui/material/styles';
import Tooltip, { type TooltipProps } from '@mui/material/Tooltip';
import { cloneElement, type FC, type ReactElement } from 'react';
import { useMediaQuery } from './use-media-query';
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
