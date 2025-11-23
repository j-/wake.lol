import {
  AppWindow as IconAppWindow,
  AppWindowMac as IconAppWindowMac,
  BatteryWarning as IconBattery0,
  Battery as IconBattery1,
  BatteryLow as IconBattery2,
  BatteryMedium as IconBattery3,
  BatteryFull as IconBattery4,
  BatteryCharging as IconBatteryCharging,
  ClockFading as IconClockFading,
  Ellipsis as IconEllipsis,
  Eye as IconEye,
  EyeClosed as IconEyeClosed,
  Hash as IconHash,
  Hourglass as IconHourglass,
  Maximize as IconMaximize,
  Maximize2 as IconMaximize2,
  Menu as IconMenu,
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
import { Platform, usePlatform } from './context/PlatformContext';

export {
  IconAppWindow,
  IconAppWindowMac,
  IconBattery0,
  IconBattery1,
  IconBattery2,
  IconBattery3,
  IconBattery4,
  IconBatteryCharging,
  IconClockFading,
  IconEllipsis,
  IconEye,
  IconEyeClosed,
  IconHash,
  IconHourglass,
  IconMaximize,
  IconMaximize2,
  IconMenu,
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
  platform: platformOverride,
  ...props
}) => {
  const detectedPlatform = usePlatform();
  const platform = platformOverride ?? detectedPlatform;

  switch (platform) {
    case Platform.WIN:
      return <IconAppWindow {...props} />;
    case Platform.MAC:
      return <IconAppWindowMac {...props} />;
    default:
      return <IconSquarePlus {...props} />;
  }
};

export type IconBatteryProps = LucideProps & {
  charging: BatteryManager['charging'];
  level: BatteryManager['level'];
};

export const IconBattery: FC<IconBatteryProps> = ({
  charging,
  level,
  ...props
}) => {
  if (charging) return <IconBatteryCharging {...props} />;
  if (level < 0.2) return <IconBattery0 {...props} />;
  if (level < 0.4) return <IconBattery1 {...props} />;
  if (level < 0.6) return <IconBattery2 {...props} />;
  if (level < 0.8) return <IconBattery3 {...props} />;
  return <IconBattery4 {...props} />;
};

export const IconColorSwatch: FC<LucideProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-gallery-thumbnails-icon lucide-gallery-thumbnails"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2"/>
  </svg>
);
