import { type FC, type PropsWithChildren } from 'react';
import { AppContext, type AppContextType, defaultAppContext } from './context';

export type MockAppControllerProps = PropsWithChildren<Partial<AppContextType>>;

export const MockAppController: FC<MockAppControllerProps> = ({
  children,
  ...props
}) => (
  <AppContext.Provider value={{
    ...defaultAppContext,
    ...props,
  }}>
    {children}
  </AppContext.Provider>
);
