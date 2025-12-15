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
