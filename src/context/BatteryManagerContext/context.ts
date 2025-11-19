import { createContext } from 'react';

export type BatteryManagerContextType = {
  level: number;
  charging: boolean;
};

export const BatteryManagerContext = createContext<
  BatteryManagerContextType | null
>(null);

BatteryManagerContext.displayName = 'BatteryManagerContext';
