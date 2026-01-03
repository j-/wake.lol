type TrackReturn = Promise<string> | undefined;

type TrackCallbackProps = {
  hostname: string;
  language: string;
  referrer: string;
  screen: string;
  title: string;
  url: string;
  website: string;
};

type TrackPayload = { website: string } & Record<string, unknown>;
type TrackEventData = Record<string, unknown>;
type TrackCallback = (props: TrackCallbackProps) => TrackPayload;

export function track(): TrackReturn;
export function track(
  eventName: string,
  eventData?: TrackEventData,
): TrackReturn;
export function track(customPayload: TrackPayload): TrackReturn;
export function track(callback: TrackCallback): TrackReturn;

export function track(...args: unknown[]): TrackReturn {
  console.debug('[umami.track]', ...args);
  const track = globalThis.umami?.track as (...a: unknown[]) => TrackReturn;
  return track?.(...args);
}
