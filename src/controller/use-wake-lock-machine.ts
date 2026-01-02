import { useMachine } from '@xstate/react';
import { useEffect, useMemo, useRef } from 'react';
import { assign, fromPromise, raise, type AnyMachineSnapshot } from 'xstate';
import { useDocument, useNavigator } from '../context/WindowContext';
import { PreconditionFailedError, RequiresUserActivationError } from '../errors';
import { machine } from './machine';
import { usePreferences } from './use-preferences';
import { getWakeLockSentinel } from './wake-lock-sentinel';

const hasSentinel = (obj: unknown): obj is { sentinel: WakeLockSentinel } =>
  typeof obj === 'object' && obj != null && 'sentinel' in obj && obj.sentinel instanceof WakeLockSentinel;

const hasError = <T>(obj: unknown): obj is { error: T } =>
  typeof obj === 'object' && obj != null && 'error' in obj;

const hasOutput = <T>(obj: unknown): obj is { output: T } =>
  typeof obj === 'object' && obj != null && 'output' in obj;

export const useWakeLockMachine = () => {
  const document = useDocument();
  const navigator = useNavigator();

  const { shouldAcquireOnLoad, shouldAcquireOnVisibilityChange } = usePreferences();

  const shouldAcquireOnLoadRef = useRef(shouldAcquireOnLoad);
  useEffect(() => {
    shouldAcquireOnLoadRef.current = shouldAcquireOnLoad;
  }, [shouldAcquireOnLoad]);

  const shouldAcquireOnVisibilityChangeRef = useRef(shouldAcquireOnVisibilityChange);
  useEffect(() => {
    shouldAcquireOnVisibilityChangeRef.current = shouldAcquireOnVisibilityChange;
  }, [shouldAcquireOnVisibilityChange]);

  const providedMachine = useMemo(() => {
    return machine.provide({
      actors: {
        requestWakeLock: fromPromise(async () => {
          return await getWakeLockSentinel(navigator, document);
        }),
        releaseWakeLock: fromPromise(async ({ input }) => {
          if (hasSentinel(input)) await input.sentinel.release();
          return null;
        }),
      },
      guards: {
        shouldAcquireOnLoad() {
          return shouldAcquireOnLoadRef.current;
        },
        shouldAcquireOnVisibilityChange() {
          return shouldAcquireOnVisibilityChangeRef.current;
        },
        pendingToggle({ context }) {
          return context.pendingToggle;
        },
        isRequiresUserActivationError({ event }) {
          return hasError(event) && (
            event.error instanceof PreconditionFailedError ||
            event.error instanceof RequiresUserActivationError
          );
        },
      },
      actions: {
        raiseLockResolved: raise(({ event }) => {
          return hasOutput<WakeLockSentinel>(event) ?
            { type: 'LOCK_RESOLVED', sentinel: event.output } :
            { type: 'LOCK_REJECTED_OTHER' };
        }),

        raiseLockRejectedRequiresUserActivation: raise({
          type: 'LOCK_REJECTED_REQUIRES_USER_ACTIVATION',
        }),

        raiseLockRejectedOther: raise({ type: 'LOCK_REJECTED_OTHER' }),

        raiseUserReleaseResolved: raise({ type: 'USER_RELEASE_RESOLVED' }),

        assignPendingToggleTrue: assign({ pendingToggle: true }),

        assignPendingToggleFalse: assign({ pendingToggle: false }),

        assignSentinel: assign(({ event }) => {
          return hasSentinel(event) ?
            { sentinel: event.sentinel } :
            {};
        }),

        clearSentinel: assign({ sentinel: null }),

        trackLocked: ({ event }) => {
          umami?.track('locked', {
            type: hasOutput<WakeLockSentinel>(event) ?
              event.output.type :
              'unknown',
          });
        },

        trackReleased: () => {
          umami?.track('released');
        },
      },
    });
  }, [navigator, document]);

  return useMachine(
    providedMachine,
    {
      inspect(event) {
        switch (event.type) {
          case '@xstate.event':
            if (!event.event.type.startsWith('xstate.')) {
              console.log('[WakeLockMachine] Event:', event.event);
            }
            break;
          case '@xstate.snapshot':
            if (event.snapshot.output) {
              console.log('[WakeLockMachine] Output:', event.snapshot.output);
            }
            break;
          case '@xstate.microstep': {
            const to = (event.snapshot as AnyMachineSnapshot).value;
            const fromEvent = event.event.type;

            console.log('[WakeLockMachine] Step:', fromEvent, '→', to);
            break;
          }
        }
      },
    },
  );
};
