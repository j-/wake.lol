import { createMachine } from 'xstate';

export const machine = createMachine({
  types: {} as {
    context: {
      sentinel: WakeLockSentinel | null;
      pendingToggle: boolean;
    };
    events:
      | { type: 'AUTO_RELEASE' }
      | { type: 'CANCEL' }
      | { type: 'LOCK_REJECTED_OTHER' }
      | { type: 'LOCK_REJECTED_REQUIRES_USER_ACTIVATION' }
      | { type: 'LOCK_RESOLVED'; sentinel: WakeLockSentinel }
      | { type: 'USER_ACTIVATION' }
      | { type: 'USER_LOCK_REQUESTED' }
      | { type: 'USER_RELEASE_REQUESTED' }
      | { type: 'USER_RELEASE_RESOLVED' }
      | { type: 'USER_TOGGLE_REQUESTED' }
      | { type: 'VISIBILITY_CHANGE_HIDDEN' }
      | { type: 'VISIBILITY_CHANGE_VISIBLE' };

    actions:
      | { type: 'assignPendingToggleFalse' }
      | { type: 'assignPendingToggleTrue' }
      | { type: 'assignSentinel' }
      | { type: 'clearSentinel' }
      | { type: 'raiseLockRejectedOther' }
      | { type: 'raiseLockRejectedRequiresUserActivation' }
      | { type: 'raiseLockResolved' }
      | { type: 'raiseUserReleaseResolved' }
      | { type: 'trackLocked' }
      | { type: 'trackReleased' };

    guards:
      | { type: 'isRequiresUserActivationError' }
      | { type: 'pendingToggle' }
      | { type: 'shouldAcquireOnLoad' }
      | { type: 'shouldAcquireOnVisibilityChange' };
  },

  context: {
    sentinel: null,
    pendingToggle: false,
  },
  id: 'wakeLol',
  initial: 'Uninitialized',

  states: {
    Uninitialized: {
      after: {
        0: [
          {
            guard: 'shouldAcquireOnLoad',
            target: 'Requesting',
          },
          { target: 'Idle' },
        ],
      },
    },

    Idle: {
      on: {
        USER_LOCK_REQUESTED: { target: 'Requesting' },
        USER_TOGGLE_REQUESTED: { target: 'Requesting' },
      },
    },

    Requesting: {
      tags: ['lockedOptimistic'],
      invoke: {
        src: 'requestWakeLock',
        onDone: {
          actions: ['raiseLockResolved', 'trackLocked'],
        },
        onError: [
          {
            guard: 'isRequiresUserActivationError',
            actions: 'raiseLockRejectedRequiresUserActivation',
          },
          {
            actions: 'raiseLockRejectedOther',
          },
        ],
      },

      on: {
        USER_TOGGLE_REQUESTED: {
          actions: 'assignPendingToggleTrue',
        },

        LOCK_RESOLVED: [
          // Toggle while requesting means: once acquired, immediately release.
          {
            guard: 'pendingToggle',
            target: 'Releasing',
            actions: ['assignSentinel', 'assignPendingToggleFalse'],
          },
          {
            target: 'Locked',
            actions: 'assignSentinel',
          },
        ],

        LOCK_REJECTED_OTHER: [
          {
            guard: 'pendingToggle',
            target: 'Idle',
            actions: 'assignPendingToggleFalse',
          },
          { target: 'Idle' },
        ],

        LOCK_REJECTED_REQUIRES_USER_ACTIVATION: [
          {
            guard: 'pendingToggle',
            target: 'Idle',
            actions: 'assignPendingToggleFalse',
          },
          { target: 'RequiresUserActivation' },
        ],
      },
    },

    Locked: {
      tags: ['lockedActual', 'lockedOptimistic'],
      on: {
        USER_RELEASE_REQUESTED: { target: 'Releasing' },
        USER_TOGGLE_REQUESTED: { target: 'Releasing' },

        // Sentinel already released (often fires before visibilitychange). Don’t call release() again.
        AUTO_RELEASE: [
          {
            guard: 'shouldAcquireOnVisibilityChange',
            target: 'Inactive',
            actions: ['clearSentinel', 'trackReleased'],
          },
          {
            target: 'Idle',
            actions: 'clearSentinel',
          },
        ],

        VISIBILITY_CHANGE_HIDDEN: [
          {
            guard: 'shouldAcquireOnVisibilityChange',
            target: 'Inactive',
            actions: 'clearSentinel',
          },
          {
            target: 'Idle',
            actions: 'clearSentinel',
          },
        ],
      },
    },

    Inactive: {
      tags: ['lockedOptimistic'],
      on: {
        VISIBILITY_CHANGE_VISIBLE: {
          guard: 'shouldAcquireOnVisibilityChange',
          target: 'Requesting',
        }, // re-acquire
        USER_RELEASE_REQUESTED: { target: 'Idle' },
        USER_TOGGLE_REQUESTED: { target: 'Idle' },

        AUTO_RELEASE: {
          target: 'Inactive',
          actions: 'clearSentinel',
        },
      },
    },

    RequiresUserActivation: {
      on: {
        CANCEL: { target: 'Idle' },
        USER_TOGGLE_REQUESTED: { target: 'Idle' },
        USER_ACTIVATION: { target: 'Requesting' },
      },
    },

    Releasing: {
      tags: ['lockedOptimistic'],
      invoke: {
        src: 'releaseWakeLock',
        input: ({ context }) => ({ sentinel: context.sentinel }),
        onDone: {
          actions: ['raiseUserReleaseResolved', 'trackReleased'],
        },
        onError: {
          // Even if release fails, treat it as released and clear local state.
          actions: 'raiseUserReleaseResolved',
        },
      },

      on: {
        USER_TOGGLE_REQUESTED: {
          actions: 'assignPendingToggleTrue',
        },

        USER_RELEASE_RESOLVED: [
          // Toggle while releasing means: once released, immediately request again.
          {
            guard: 'pendingToggle',
            target: 'Requesting',
            actions: ['clearSentinel', 'assignPendingToggleFalse'],
          },
          {
            target: 'Idle',
            actions: 'clearSentinel',
          },
        ],
      },
    },
  },
});
