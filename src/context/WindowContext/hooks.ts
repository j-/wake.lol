import { useContext } from 'react';
import { WindowContext } from './context';

export const useWindow = (): Window => {
  return useContext(WindowContext);
};

export const useDocument = (): Document => {
  return useWindow().document;
};

export const useNavigator = (): Navigator => {
  return useWindow().navigator;
};

export const useOpener = (): Window | null => {
  return useWindow().opener ?? null as Window | null;
};

export const useBody = (): HTMLBodyElement => {
  return useDocument().body as HTMLBodyElement;
};
