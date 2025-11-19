import { useContext } from 'react';
import { BatteryManagerContext } from './context';

export const useBattery = () => {
  return useContext(BatteryManagerContext);
};
