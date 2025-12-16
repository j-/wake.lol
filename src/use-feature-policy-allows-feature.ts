import * as Sentry from '@sentry/react';
import { useMemo } from 'react';
import { useDocument } from './context/WindowContext';

interface FeaturePolicy {
  allowsFeature?: (feature: string) => boolean;
}

declare global {
  interface Document {
    featurePolicy?: FeaturePolicy;
    permissionsPolicy?: FeaturePolicy;
    policy?: FeaturePolicy;
  }
}

/**
 * Determines if a particular feature is allowed by the document's feature
 * policy.
 *
 * @param feature Feature name e.g. `fullscreen`.
 * @returns
 * - `true` if allowed
 * - `false` if disallowed
 * - `null` if feature policy is not supported or detection failed
 */
export const useFeaturePolicyAllowsFeature = (feature: string) => {
  const document = useDocument();

  const featurePolicy = (
    document.permissionsPolicy ||
    document.featurePolicy ||
    document.policy
  );

  return useMemo(() => {
    if (!featurePolicy || typeof featurePolicy.allowsFeature !== 'function') {
      return null;
    }

    try {
      return featurePolicy.allowsFeature(feature);
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          feature,
        },
      });

      return null;
    }
  }, [featurePolicy, feature]);
};
