import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { useNavigator } from '../WindowContext';
import { BatteryManagerContext, type BatteryManagerContextType } from './context';

export const BatteryProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigator = useNavigator();

  const [manager, setManager] = useState<BatteryManager | null>(null);
  const [value, setValue] = useState<BatteryManagerContextType | null>(null);

  useEffect(() => {
    navigator.getBattery().then(setManager);
  }, [navigator]);

  useEffect(() => {
    if (!manager) return;
    const controller = new AbortController();
    const signal = controller.signal;
    const update = () => {
      setValue({
        level: manager.level,
        charging: manager.charging,
      });
    };
    manager.addEventListener('chargingchange', update, { signal });
    manager.addEventListener('levelchange', update, { signal });
    update();
    return () => {
      controller.abort();
    };
  }, [manager]);

  return (
    <BatteryManagerContext value={value}>{children}</BatteryManagerContext>
  );
};
