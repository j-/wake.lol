import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import svgActive from '../icons/active.inline.svg';
import svgInactive from '../icons/inactive.inline.svg';
import { getWakeLockSentinel } from '../wake-lock-sentinel';

const useIsInitialized = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return isInitialized;
};

const HomePage: NextPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel>();
  const isInitialized = useIsInitialized();
  const isActive = isEnabled && sentinel != null;

  const showWakeLockEnabled = useCallback(() => {
    document.documentElement.classList.remove(styles.isInactive);
    document.documentElement.classList.add(styles.isActive);
  }, []);

  const showWakeLockDisabled = useCallback(() => {
    document.documentElement.classList.remove(styles.isActive);
    document.documentElement.classList.add(styles.isInactive);
  }, []);

  const handleClickToggle = useCallback(async () => {
    if (isEnabled && sentinel) {
      setIsEnabled(false);
      try {
        await sentinel.release();
      } finally {
        setSentinel(undefined);
      }
    } else {
      setIsEnabled(true);
      const sentinel = await getWakeLockSentinel();
      setSentinel(sentinel);
    }
  }, [isEnabled, sentinel]);

  useEffect(() => {
    if (isActive) {
      showWakeLockEnabled();
    } else {
      showWakeLockDisabled();
    }
  }, [isActive, showWakeLockDisabled, showWakeLockEnabled]);

  useEffect(() => {
    if (!sentinel) return;
    const handleRelease = () => {
      setSentinel(undefined);
    };
    sentinel.addEventListener('release', handleRelease);
    return () => {
      sentinel.removeEventListener('release', handleRelease);
    };
  }, [sentinel]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (isEnabled && sentinel == null && document.visibilityState === 'visible') {
        const sentinel = await getWakeLockSentinel();
        setSentinel(sentinel);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleVisibilityChange);
    };
  }, [isEnabled, sentinel]);

  useEffect(() => {
    const icons = document.querySelectorAll<HTMLLinkElement>('link[rel~=icon]');
    for (const icon of Array.from(icons)) {
      icon.parentElement?.removeChild(icon);
    }

    return () => {
      const icons = document.querySelectorAll<HTMLLinkElement>('link[rel~=icon]');
      for (const icon of Array.from(icons)) {
        document.head.appendChild(icon);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{isActive ? '[ENABLED] wake.lol is enabled, sleep is disabled' : 'wake.lol'}</title>
        <link rel="icon" type="image/svg+xml" href={isActive ? svgActive : svgInactive} />
        <meta name="description" content="Keep your screen awake without installing anything. A handy little website with a silly little name." />
      </Head>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={handleClickToggle}
        title={isActive ? 'Wake lock is enabled, click to disable' : 'Wake lock is disabled, click to enable'}
        disabled={!isInitialized}
      >
        {
          isActive ?
            <Image
              className={styles.indicatorIcon}
              src={svgActive}
              alt="Open eye icon"
              width={64}
              height={64}
            /> :
            <Image
              className={styles.indicatorIcon}
              src={svgInactive}
              alt="Closed eye icon"
              width={64}
              height={64}
            />
        }
      </button>
    </>
  );
};

export const getStaticProps = () => ({
  props: {
    documentClassName: styles.isInactive,
  },
});

export default HomePage;
