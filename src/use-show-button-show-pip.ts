import { usePictureInPictureOpener } from './context/PictureInPictureOpenerContext';
import { useAppContext } from './controller';
import { useFeaturePolicyAllowsFeature } from './use-feature-policy-allows-feature';
import { useIsTopLevelBrowsingContext } from './use-is-top-level-browsing-context';
import { useMatchesDisplayMode } from './use-matches-display-mode';

export const useShowButtonShowPiP = () => {
  const { canPictureInPicture } = useAppContext();
  const isDisplayModePiP = useMatchesDisplayMode('picture-in-picture');
  const isPiPPolicyAllowed =
    useFeaturePolicyAllowsFeature('picture-in-picture');
  const { isPictureInPictureWindowOpen } = usePictureInPictureOpener();
  const isTopLevel = useIsTopLevelBrowsingContext();

  return (
    // Picture in picture is supported.
    canPictureInPicture &&
    // No picture in picture window already shown.
    !isPictureInPictureWindowOpen &&
    // Not rendering this hook inside a PiP window.
    !isDisplayModePiP &&
    // Picture in picture is not disabled by policy.
    isPiPPolicyAllowed !== false &&
    // Not allowed inside an iframe.
    isTopLevel
  );
};
