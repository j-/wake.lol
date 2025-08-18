import { WakeActionsContainer } from './WakeActionsContainer';

export const Red = () => (
  <WakeActionsContainer
    bgColor="hsl(0, 80%, 80%)"
    actionsHeight="auto"
  />
);

export const Green = () => (
  <WakeActionsContainer
    bgColor="hsl(100, 80%, 80%)"
    actionsHeight="auto"
  />
);

export const Blue = () => (
  <WakeActionsContainer
    bgColor="hsl(200, 80%, 80%)"
    actionsHeight="auto"
  />
);

export const Grey = () => (
  <WakeActionsContainer
    bgColor="hsl(200, 0%, 20%)"
    actionsHeight="auto"
  />
);
