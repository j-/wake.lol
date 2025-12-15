// eslint-disable-next-line no-restricted-globals
export const exitFullscreen = async (documentArg = document) => {
  if (typeof documentArg.exitFullscreen === 'function') {
    return documentArg.exitFullscreen();
  } else if (typeof documentArg.mozExitFullScreen === 'function') {
    return documentArg.mozExitFullScreen();
  } else if (typeof documentArg.msExitFullscreen === 'function') {
    return documentArg.msExitFullscreen();
  } else if (typeof documentArg.webkitExitFullScreen === 'function') {
    return documentArg.webkitExitFullScreen();
  } else if (typeof documentArg.webkitExitFullscreen === 'function') {
    return documentArg.webkitExitFullscreen();
  } else {
    throw new Error('Failed to exit fullscreen');
  }
};
