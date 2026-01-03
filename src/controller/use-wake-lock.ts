import { useCallback, useEffect, useMemo } from 'react';
import { useDocument } from '../context/WindowContext';
import { usePreferences } from './use-preferences';
import { useWakeLockMachine } from './use-wake-lock-machine';

export type RequestWakeLock = () => Promise<WakeLockSentinel | null>;
export type ReleaseWakeLock = () => Promise<void>;
export type ToggleWakeLock = () => Promise<WakeLockSentinel | null | void>;

export type UseWakeLock = () => UseWakeLockResult;

export type UseWakeLockResult = {
  sentinel: WakeLockSentinel | null;
  isLockedActual: boolean;
  isLockedOptimistic: boolean;
  requiresUserActivation: boolean;
  cancel: VoidFunction;
  userActivation: VoidFunction;
  requestWakeLock: RequestWakeLock;
  releaseWakeLock: ReleaseWakeLock;
  toggleWakeLock: ToggleWakeLock;
};

export const useWakeLock: UseWakeLock = () => {
  const document = useDocument();
  const [state, send] = useWakeLockMachine();
  const { shouldAcquireOnLoad } = usePreferences();

  const releaseWakeLock = useCallback<ReleaseWakeLock>(async () => {
    send({ type: 'USER_RELEASE_REQUESTED' });
  }, [send]);

  const requestWakeLock = useCallback<RequestWakeLock>(async () => {
    send({ type: 'USER_LOCK_REQUESTED' });
    return null;
  }, [send]);

  const toggleWakeLock = useCallback<ToggleWakeLock>(async () => {
    send({ type: 'USER_TOGGLE_REQUESTED' });
    return null;
  }, [send]);

  const cancel = useCallback(async () => {
    send({ type: 'CANCEL' });
  }, [send]);

  const userActivation = useCallback(async () => {
    send({ type: 'USER_ACTIVATION' });
  }, [send]);

  const sentinel = state.context.sentinel;
  const isLockedActual = state.hasTag('lockedActual');
  const isLockedOptimistic = (
    isLockedActual ||
    state.hasTag('lockedOptimistic') ||
    (state.matches('Uninitialized') && shouldAcquireOnLoad)
  );
  const requiresUserActivation = state.matches('RequiresUserActivation');

  if (sentinel && !sentinel.released && !isLockedActual) {
    console.warn(
      'Wake Lock is held but state machine is not in a lockedActual state. ' +
      'This may indicate a bug in the state machine implementation.',
    );
  }

  const result = useMemo<UseWakeLockResult>(() => ({
    sentinel,
    isLockedActual,
    isLockedOptimistic,
    requiresUserActivation,
    cancel,
    userActivation,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  }), [
    sentinel,
    isLockedActual,
    isLockedOptimistic,
    requiresUserActivation,
    cancel,
    userActivation,
    requestWakeLock,
    releaseWakeLock,
    toggleWakeLock,
  ]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      send({
        type: document.visibilityState === 'hidden'
          ? 'VISIBILITY_CHANGE_HIDDEN'
          : 'VISIBILITY_CHANGE_VISIBLE',
      });
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [document, send]);

  useEffect(() => {
    if (!sentinel) return;

    const handleSentinelRelease = async () => {
      if (sentinel.released) {
        send({ type: 'AUTO_RELEASE' });
      }
    };

    sentinel.addEventListener('release', handleSentinelRelease);
    return () => {
      sentinel.removeEventListener('release', handleSentinelRelease);
    };
  }, [send, sentinel]);

  return result;
};
