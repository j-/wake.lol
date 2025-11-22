import { MockAppController } from '../controller/MockAppController';
import { ActionButtonFullscreen } from './action-fullscreen';

const toggleFullscreen = async () => {
  console.log('Fullscreen toggle action called');
};

export const Maximized = () => (
  <MockAppController
    isFullscreen={true}
    toggleFullscreen={toggleFullscreen}
  >
    <ActionButtonFullscreen />
  </MockAppController>
);

export const Unmaximized = () => (
  <MockAppController
    isFullscreen={false}
    toggleFullscreen={toggleFullscreen}
  >
    <ActionButtonFullscreen />
  </MockAppController>
);
