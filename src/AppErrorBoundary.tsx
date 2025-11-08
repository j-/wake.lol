import type { FC, PropsWithChildren } from 'react';
import { ErrorBoundary} from 'react-error-boundary';
import { AppFallback } from './AppFallback';

export const AppErrorBoundary: FC<PropsWithChildren> = ({ children }) => (
  <ErrorBoundary FallbackComponent={AppFallback}>
    {children}
  </ErrorBoundary>
);
