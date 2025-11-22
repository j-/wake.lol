import { useContext } from 'react';
import { PlatformContext } from './context';

export const usePlatform = () =>
  useContext(PlatformContext);
