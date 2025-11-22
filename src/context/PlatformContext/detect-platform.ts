export enum Platform {
  /** MacOS */
  MAC = 'mac',
  /** iOS */
  IOS = 'ios',
  /** Windows */
  WIN = 'win',
  /** Android */
  AND = 'and',
  /** Linux */
  LIN = 'lin',
  /** Other */
  OTH = 'oth',
}

const macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

// See https://stackoverflow.com/a/38241481
export const detectPlatform = (
  // eslint-disable-next-line no-restricted-globals
  platform = window.navigator.platform,
  // eslint-disable-next-line no-restricted-globals
  userAgent = window.navigator.userAgent,
): Platform => {
  try {
    if (macosPlatforms.includes(platform)) {
      return Platform.MAC;
    } else if (iosPlatforms.includes(platform)) {
      return Platform.IOS;
    } else if (windowsPlatforms.includes(platform)) {
      return Platform.WIN;
    } else if (/Android/.test(userAgent)) {
      return Platform.AND;
    } else if (/Linux/.test(platform)) {
      return Platform.LIN;
    } else {
      return Platform.OTH;
    }
  } catch {
    return Platform.OTH;
  }
};
