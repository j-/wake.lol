import { createContext } from 'react';

// eslint-disable-next-line no-restricted-globals
export const WindowContext = createContext<Window>(window);

WindowContext.displayName = 'WindowContext';
