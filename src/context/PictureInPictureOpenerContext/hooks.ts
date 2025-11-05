import { useContext } from 'react';
import { PictureInPictureOpenerContext } from './context';

export const usePictureInPictureOpener = () =>
  useContext(PictureInPictureOpenerContext);
