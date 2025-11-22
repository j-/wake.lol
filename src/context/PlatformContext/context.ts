import { createContext } from 'react';
import { Platform } from './detect-platform';

export const PlatformContext = createContext(Platform.OTH);

PlatformContext.displayName = 'PlatformContext';
