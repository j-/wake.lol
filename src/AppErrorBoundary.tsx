import * as Sentry from '@sentry/react';
import type { FC, PropsWithChildren } from 'react';
import { AppFallback } from './AppFallback';

export const AppErrorBoundary: FC<PropsWithChildren> = ({ children }) => (
  <Sentry.ErrorBoundary fallback={AppFallback}>
    {children}
  </Sentry.ErrorBoundary>
);
