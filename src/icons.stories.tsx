import { Platform, PlatformProvider } from './context/PlatformContext';
import { IconAppWindowPlatform, IconColorSwatch } from './icons';

export const IconColorSwatchRed = () => <IconColorSwatch fill="red" />;
export const IconColorSwatchGreen = () => <IconColorSwatch fill="green" />;
export const IconColorSwatchBlue = () => <IconColorSwatch fill="blue" />;

export const IconAppWindowPlatformMac = () => (
  <PlatformProvider platform={Platform.MAC}>
    <IconAppWindowPlatform />
  </PlatformProvider>
);

export const IconAppWindowPlatformWin = () => (
  <PlatformProvider platform={Platform.WIN}>
    <IconAppWindowPlatform />
  </PlatformProvider>
);

export const IconAppWindowPlatformAnd = () => (
  <PlatformProvider platform={Platform.AND}>
    <IconAppWindowPlatform />
  </PlatformProvider>
);

export const IconAppWindowPlatformIos = () => (
  <PlatformProvider platform={Platform.IOS}>
    <IconAppWindowPlatform />
  </PlatformProvider>
);
