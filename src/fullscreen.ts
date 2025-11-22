interface RequestFullscreen {
  (options?: FullscreenOptions): void | Promise<void>;
}

interface ExitFullscreen {
  (): void | Promise<void>;
}

declare global {
  interface Document {
    mozExitFullScreen?: ExitFullscreen;
    msExitFullscreen?: ExitFullscreen;
    webkitExitFullScreen?: ExitFullscreen;
    webkitExitFullscreen?: ExitFullscreen;
  }

  interface HTMLElement {
    mozRequestFullScreen?: RequestFullscreen;
    msRequestFullscreen?: RequestFullscreen;
    webkitEnterFullScreen?: RequestFullscreen;
    webkitRequestFullscreen?: RequestFullscreen;
  }
}

export const canRequestFullscreen = (el: HTMLElement) => (
  typeof el.requestFullscreen === 'function' ||
  typeof el.mozRequestFullScreen === 'function' ||
  typeof el.msRequestFullscreen === 'function' ||
  typeof el.webkitEnterFullScreen === 'function' ||
  typeof el.webkitRequestFullscreen === 'function'
);

export const requestFullscreen = async (
  el: HTMLElement,
  options?: FullscreenOptions,
) => {
  if (typeof el.requestFullscreen === 'function') {
    return el.requestFullscreen(options);
  } else if (typeof el.mozRequestFullScreen === 'function') {
    return el.mozRequestFullScreen(options);
  } else if (typeof el.msRequestFullscreen === 'function') {
    return el.msRequestFullscreen(options);
  } else if (typeof el.webkitEnterFullScreen === 'function') {
    return el.webkitEnterFullScreen(options);
  } else if (typeof el.webkitRequestFullscreen === 'function') {
    return el.webkitRequestFullscreen(options);
  } else {
    throw new Error('Failed to request fullscreen');
  }
};

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
