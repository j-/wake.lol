import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

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

const HomePage: NextPage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const showWakeLockEnabled = useCallback(() => {
    document.documentElement.classList.remove(styles.homeWakeLockDisabled);
    document.documentElement.classList.add(styles.homeWakeLockEnabled);
  }, []);

  const showWakeLockDisabled = useCallback(() => {
    document.documentElement.classList.remove(styles.homeWakeLockEnabled);
    document.documentElement.classList.add(styles.homeWakeLockDisabled);
  }, []);

  const handleClickToggle = useCallback(() => {
    if (isEnabled) {
      setIsEnabled(false);
      showWakeLockDisabled();
    } else {
      setIsEnabled(true);
      showWakeLockEnabled();
    }
  }, [isEnabled, showWakeLockDisabled, showWakeLockEnabled]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      showWakeLockDisabled();
    } else if (isEnabled) {
      showWakeLockEnabled();
    }
  }, [isEnabled, showWakeLockDisabled, showWakeLockEnabled]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={handleClickToggle}
        title={isEnabled ? 'Wake lock is enabled, click to disable' : 'Wake lock is disabled, click to enable'}
        disabled={!isInitialized}
      >
        {isEnabled ? eyeOpen : eyeClosed}
      </button>
    </>
  );
};

HomePage.getInitialProps = () => ({
  documentClassName: styles.homeWakeLockDisabled,
});

export default HomePage;
