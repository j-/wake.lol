import { useDocument } from './context/WindowContext';
import { useAppContext } from './controller';
import { canRequestFullscreen } from './fullscreen/can-request-fullscreen';
import { useFullscreenElement } from './fullscreen/use-fullscreen-element';
import { useFullscreenEnabled } from './fullscreen/use-fullscreen-enabled';
import { useFeaturePolicyAllowsFeature } from './use-feature-policy-allows-feature';
import { useMatchesDisplayMode } from './use-matches-display-mode';

export const useShowButtonBlackScreen = () => {
  const document = useDocument();
  const { isFullscreen: isAnotherElementFullscreen } = useAppContext();
  const fullscreenElement = useFullscreenElement();
  const isFullscreenEnabled = useFullscreenEnabled();
  const isDisplayModeFullscreen = useMatchesDisplayMode('fullscreen');
  const isFullscreenPolicyAllowed = useFeaturePolicyAllowsFeature('fullscreen');

  return (
    // Nothing else within the app is fullscreen.
    !isAnotherElementFullscreen &&
    // Nothing else outside the app is fullscreen.
    fullscreenElement == null &&
    // The page is not already in fullscreen mode.
    !isDisplayModeFullscreen &&
    // Fullscreen is not disallowed by feature policy.
    isFullscreenPolicyAllowed !== false &&
    // The document's fullscreen API is enabled.
    isFullscreenEnabled &&
    // The document can request fullscreen.
    canRequestFullscreen(document.body)
  );
};
