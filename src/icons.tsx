import {
  AppWindow as IconAppWindow,
  AppWindowMac as IconAppWindowMac,
  ClockFading as IconClockFading,
  Ellipsis as IconEllipsis,
  Eye as IconEye,
  EyeClosed as IconEyeClosed,
  Hash as IconHash,
  Hourglass as IconHourglass,
  Maximize as IconMaximize,
  Maximize2 as IconMaximize2,
  Minimize as IconMinimize,
  Minimize2 as IconMinimize2,
  Palette as IconPalette,
  PictureInPicture as IconPictureInPicture,
  Pipette as IconPipette,
  SquarePlus as IconSquarePlus,
  Timer as IconTimer,
  Undo as IconUndo,
  type LucideProps,
} from 'lucide-react';
import type { FC } from 'react';
import { Platform, detectPlatform } from './detect-platform';

export {
  IconAppWindow,
  IconAppWindowMac,
  IconClockFading,
  IconEllipsis,
  IconEye,
  IconEyeClosed,
  IconHash,
  IconHourglass,
  IconMaximize,
  IconMaximize2,
  IconMinimize,
  IconMinimize2,
  IconPalette,
  IconPictureInPicture,
  IconPipette,
  IconTimer,
  IconUndo,
};

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
