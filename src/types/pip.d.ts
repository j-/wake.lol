/* eslint-disable @typescript-eslint/no-explicit-any */

// https://gist.github.com/Rendez/6e088e8713f47e87ab04efcc22f365b1

interface PictureInPictureResizeEvent extends Event {
  readonly target: PictureInPictureWindow;
}

interface PictureInPictureWindow extends Window {
  readonly width: number;
  readonly height: number;
  onresize(this: PictureInPictureWindow, ev: PictureInPictureResizeEvent): void;
  addEventListener(
    type: 'resize',
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: 'resize',
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

interface PictureInPictureEvent extends Event {
  readonly pictureInPictureWindow: PictureInPictureWindow;
}

type PictureInPictureEventListener = ((this: HTMLVideoElement, ev: PictureInPictureEvent) => any) | null;

interface HTMLVideoElement {
  autoPictureInPicture: boolean;
  disablePictureInPicture: boolean;
  requestPictureInPicture(): Promise<PictureInPictureWindow>;
  onenterpictureinpicture: PictureInPictureEventListener;
  onleavepictureinpicture: PictureInPictureEventListener;
}

interface Document {
  readonly pictureInPictureEnabled: boolean;
  exitPictureInPicture(): Promise<void>;
}

interface DocumentOrShadowRoot {
  readonly pictureInPictureElement: HTMLVideoElement | null;
}

// My edit.
interface PictureInPictureEnterEvent extends Event {
  readonly window: PictureInPictureWindow;
}

interface RequestPictureInPictureWindowOptions {
  width: number;
  height: number;
}

interface DocumentPictureInPicture extends EventTarget {
  window: Window;
  requestWindow: (options: RequestPictureInPictureWindowOptions) => Promise<PictureInPictureWindow>;
  onenter(this: PictureInPictureWindow, ev: PictureInPictureEnterEvent): void;
  addEventListener(
    type: 'enter',
    listener: (this: DocumentPictureInPicture, ev: PictureInPictureEnterEvent) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener(
    type: 'enter',
    listener: (this: DocumentPictureInPicture, ev: PictureInPictureEnterEvent) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

interface Window {
  documentPictureInPicture: DocumentPictureInPicture;
}
