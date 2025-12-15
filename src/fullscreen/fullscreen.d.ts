export {};

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
