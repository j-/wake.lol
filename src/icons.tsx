import {
  AppWindow as IconAppWindow,
  AppWindowMac as IconAppWindowMac,
  Ellipsis as IconEllipsis,
  Eye as IconEye,
  EyeClosed as IconEyeClosed,
  Hash as IconHash,
  Maximize as IconMaximize,
  Maximize2 as IconMaximize2,
  Minimize as IconMinimize,
  Minimize2 as IconMinimize2,
  Palette as IconPalette,
  PictureInPicture as IconPictureInPicture,
  Pipette as IconPipette,
  SquarePlus as IconSquarePlus,
  Undo as IconUndo,
  type LucideProps,
} from 'lucide-react';
import type { FC } from 'react';
import { Platform, detectPlatform } from './detect-platform';

export {
  IconAppWindow,
  IconAppWindowMac,
  IconEllipsis,
  IconEye,
  IconEyeClosed,
  IconHash,
  IconMaximize,
  IconMaximize2,
  IconMinimize,
  IconMinimize2,
  IconPalette,
  IconPictureInPicture,
  IconPipette,
  IconUndo,
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
  platform?: Platform;
};

export const IconAppWindowPlatform: FC<IconAppWindowPlatformProps> = ({
  platform = detectPlatform(),
  ...props
}) => {
  switch (platform) {
    case Platform.WIN:
      return <IconAppWindow {...props} />;
    case Platform.MAC:
      return <IconAppWindowMac {...props} />;
    default:
      return <IconSquarePlus {...props} />;
  }
};
