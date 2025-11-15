import { createContext } from 'react';

export enum AutoDisableTimerType {
  CLOCK,
  COUNTDOWN,
}

export type AutoDisableTimerState = {
  disableType: null;
  disableTime: null;
} | {
  disableType: AutoDisableTimerType;
  disableTime: number;
};

export const DEFAULT_AUTO_DISABLE_TIMER_STATE = Object.freeze({
  disableType: null,
  disableTime: null,
});

export type SetAutoDisableTimer =
  (type: AutoDisableTimerType, time: number) => void;

export type ClearAutoDisableTimer = () => void;

export type AutoDisableTimerContextType = AutoDisableTimerState & {
  setAutoDisableTimer: SetAutoDisableTimer;
  clearAutoDisableTimer: ClearAutoDisableTimer;
};

export const AutoDisableTimerContext = createContext<
  AutoDisableTimerContextType
>({
  ...DEFAULT_AUTO_DISABLE_TIMER_STATE,
  setAutoDisableTimer: () => {
    throw new Error(
      'setAutoDisableTimer must be used within a AutoDisableTimerContext',
    );
  },
  clearAutoDisableTimer: () => {
    throw new Error(
      'clearAutoDisableTimer must be used within a AutoDisableTimerContext',
    );
  },
});

AutoDisableTimerContext.displayName = 'AutoDisableTimerContext';
