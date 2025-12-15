export const canRequestFullscreen = (el: HTMLElement) => (
  typeof el.requestFullscreen === 'function' ||
  typeof el.mozRequestFullScreen === 'function' ||
  typeof el.msRequestFullscreen === 'function' ||
  typeof el.webkitEnterFullScreen === 'function' ||
  typeof el.webkitRequestFullscreen === 'function'
);
