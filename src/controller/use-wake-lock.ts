import { useCallback, useEffect, useMemo, useState } from 'react';
import { getWakeLockSentinel } from './wake-lock-sentinel';
import { useDocument, useNavigator } from '../context/WindowContext';

export type RequestWakeLock = () => Promise<WakeLockSentinel | null>;
export type ReleaseWakeLock = () => Promise<void>;
export type ToggleWakeLock = () => Promise<WakeLockSentinel | null | void>;

export type UseWakeLock = () => UseWakeLockResult;

export type UseWakeLockResult = {
  sentinel: WakeLockSentinel | null;
  didReleaseAutomatically: boolean;
  requestWakeLock: RequestWakeLock;
  releaseWakeLock: ReleaseWakeLock;
  toggleWakeLock: ToggleWakeLock;
};

export const useWakeLock: UseWakeLock = () => {
  const navigator = useNavigator();
  const document = useDocument();
  const [sentinel, setSentinel] = useState<WakeLockSentinel | null>(null);
  const [didReleaseAutomatically, setDidReleaseAutomatically] = useState(false);

  const releaseWakeLock = useCallback<ReleaseWakeLock>(async () => {
    if (sentinel) {
      await sentinel.release();
      setSentinel(null);
      setDidReleaseAutomatically(false);
    }
  }, [sentinel]);

  const requestWakeLock = useCallback<RequestWakeLock>(async () => {
    if (sentinel && !sentinel.released) {
      await releaseWakeLock();
    }
    const newSentinel = await getWakeLockSentinel(navigator, document);
    setSentinel(newSentinel);
    setDidReleaseAutomatically(false);
    return newSentinel;
  }, [document, navigator, releaseWakeLock, sentinel]);

  const toggleWakeLock = useCallback<ToggleWakeLock>(async () => {
    if (sentinel && !sentinel.released) {
      await releaseWakeLock();
      setDidReleaseAutomatically(false);
    } else {
      const newSentinel = await requestWakeLock();
      setDidReleaseAutomatically(false);
      return newSentinel;
    }
  }, [releaseWakeLock, requestWakeLock, sentinel]);

  const result = useMemo<UseWakeLockResult>(() => ({
    sentinel,
    didReleaseAutomatically,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  }), [
    sentinel,
    didReleaseAutomatically,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  ]);

  useEffect(() => {
    if (!sentinel || didReleaseAutomatically) return;
    const handleSentinelRelease = async () => {
      if (sentinel.released) {
        setDidReleaseAutomatically(true);
      }
    }
    sentinel.addEventListener('release', handleSentinelRelease);
    return () => {
      sentinel.removeEventListener('release', handleSentinelRelease);
    };
  }, [sentinel, didReleaseAutomatically]);

  return result;
};
