import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { WindowContext } from './context';

export type WindowProviderProps = PropsWithChildren<{
  window?: ComponentProps<typeof WindowContext>['value'];
}>;

export const WindowProvider: FC<WindowProviderProps> = ({
  // eslint-disable-next-line no-restricted-globals
  window: value = window,
  children,
}) => <WindowContext value={value}>{children}</WindowContext>;
