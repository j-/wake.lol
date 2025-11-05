import { FC } from 'react';

import {
  AppWindow as IconAppWindow,
  AppWindowMac as IconAppWindowMac,
  Eye as IconEye,
  EyeClosed as IconEyeClosed,
  Maximize as IconMaximize,
  Maximize2 as IconMaximize2,
  Minimize as IconMinimize,
  Minimize2 as IconMinimize2,
  PictureInPicture as IconPictureInPicture,
  type LucideProps,
} from 'lucide-react';

export {
  IconAppWindow,
  IconAppWindowMac,
  IconEye,
  IconEyeClosed,
  IconMaximize,
  IconMaximize2,
  IconMinimize,
  IconMinimize2,
  IconPictureInPicture
};

export type IconEyeOpenClosedProps = LucideProps & {
  isWakeLockEnabled: boolean;
};

export const IconEyeOpenClosed: FC<IconEyeOpenClosedProps> = ({
  isWakeLockEnabled,
  ...props
}) => (
  isWakeLockEnabled ? <IconEye {...props} /> : <IconEyeClosed {...props} />
);

export type IconMaximizeMinimizeProps = LucideProps & {
  isMaximized: boolean;
};

export const IconMaximizeMinimize: FC<IconMaximizeMinimizeProps> = ({
  isMaximized,
  ...props
}) => (
  isMaximized ? <IconMinimize {...props} /> : <IconMaximize {...props} />
);

export type IconExpandCollapseProps = LucideProps & {
  isExpanded: boolean;
};

export const IconExpandCollapse: FC<IconExpandCollapseProps> = ({
  isExpanded,
  ...props
}) => (
  isExpanded ? <IconMinimize2 {...props} /> : <IconMaximize2 {...props} />
);

export type IconAppWindowPlatformProps = LucideProps & {
  plat?: 'mac' | 'win';
};

export const IconAppWindowPlatform: FC<IconAppWindowPlatformProps> = ({
  // eslint-disable-next-line no-restricted-globals
  plat = navigator.platform.startsWith('Mac') ? 'mac' : 'win',
  ...props
}) => (
  plat === 'mac' ? <IconAppWindowMac {...props} /> : <IconAppWindow {...props} />
);
