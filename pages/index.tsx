import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import svgActive from '../icons/active.svg';
import svgInactive from '../icons/inactive.svg';

const eyeClosed = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={styles.indicatorIcon}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 0 1 4.02 8.971m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88 6.59 6.59m7.532 7.532 3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 0 1-4.132 5.411m0 0L21 21"
    />
  </svg>
);

const eyeOpen = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={styles.indicatorIcon}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const useIsInitialized = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return isInitialized;
};

const useIsHidden = (defaultValue = false) => {
  const [isHidden, setIsHidden] = useState(defaultValue);

  const handleVisibilityChange = useCallback(() => {
    setIsHidden(document.hidden);
  }, []);

  useEffect(() => {
    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return isHidden;
};

const HomePage: NextPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const isInitialized = useIsInitialized();
  const isHidden = useIsHidden();
  const isActive = isEnabled && !isHidden;

  const showWakeLockEnabled = useCallback(() => {
    document.documentElement.classList.remove(styles.isInactive);
    document.documentElement.classList.add(styles.isActive);
  }, []);

  const showWakeLockDisabled = useCallback(() => {
    document.documentElement.classList.remove(styles.isActive);
    document.documentElement.classList.add(styles.isInactive);
  }, []);

  const handleClickToggle = useCallback(() => {
    setIsEnabled((isEnabled) => !isEnabled);
  }, []);

  useEffect(() => {
    if (isActive) {
      showWakeLockEnabled();
    } else {
      showWakeLockDisabled();
    }
  }, [isActive, showWakeLockDisabled, showWakeLockEnabled]);

  return (
    <>
      <Head>
        <title>{isActive ? '[ENABLED] wake.lol is enabled, sleep is disabled' : 'wake.lol'}</title>
        <link rel="icon" type="image/svg+xml" href={isActive ? svgActive.src : svgInactive.src} />
      </Head>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={handleClickToggle}
        title={isActive ? 'Wake lock is enabled, click to disable' : 'Wake lock is disabled, click to enable'}
        disabled={!isInitialized}
      >
        {isActive ? eyeOpen : eyeClosed}
      </button>
    </>
  );
};

HomePage.getInitialProps = () => ({
  documentClassName: styles.isInactive,
});

export default HomePage;
