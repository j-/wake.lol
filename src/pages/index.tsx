import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from '../styles/Home.module.css';
import svgActive from '../icons/active.inline.svg';
import svgInactive from '../icons/inactive.inline.svg';
import svgNewWindow from '../icons/window.inline.svg';
import { getWakeLockSentinel } from '../wake-lock-sentinel';

const BASE_URL = 'https://wake.lol/';
const PARAM_STANDALONE = 'standalone';
const PARAM_NEW_WINDOW = 'newwindow';
const FEATURES = 'width=300,height=200';

const useIsInitialized = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return isInitialized;
};

const usePageUrl = () => {
  const isInitialized = useIsInitialized();
  return isInitialized ? new URL(window.location.href) : new URL(BASE_URL);
};

const HomePage: NextPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel>();
  const isInitialized = useIsInitialized();
  const isActive = isEnabled && sentinel != null;

  const pageUrl = usePageUrl();

  const isStandalone = useMemo(() => {
    return pageUrl.searchParams.has(PARAM_STANDALONE);
  }, [pageUrl]);

  const isNewWindow = useMemo(() => {
    return pageUrl.searchParams.has(PARAM_NEW_WINDOW);
  }, [pageUrl]);

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

  const handleClickOpenNewWindow = useCallback(() => {
    const newUrl = new URL(pageUrl);
    newUrl.searchParams.set(PARAM_NEW_WINDOW, '');
    window.open(newUrl, undefined, FEATURES);
  }, [pageUrl]);

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
        <meta name="theme-color" content={isActive ? '#bef5a3' : '#f5a3a3'} />
      </Head>
      <div className={classNames(styles.container, isNewWindow && styles.containerNewWindow)}>
        <div className={styles.main}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleClickToggle}
            title={isActive ? 'Wake lock is enabled, click to disable' : 'Wake lock is disabled, click to enable'}
            disabled={!isInitialized}
          >
            {
              isActive ?
                <Image
                  className={styles.icon}
                  src={svgActive}
                  alt="Open eye icon"
                  width={64}
                  height={64}
                /> :
                <Image
                  className={styles.icon}
                  src={svgInactive}
                  alt="Closed eye icon"
                  width={64}
                  height={64}
                />
            }
          </button>
        </div>
        {isNewWindow ? null : (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={handleClickOpenNewWindow}
              title="Open in new window"
            >
              <Image
                className={styles.icon}
                src={svgNewWindow}
                alt="New window icon"
                width={64}
                height={64}
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export const getStaticProps = () => ({
  props: {
    documentClassName: styles.isInactive,
  },
});

export default HomePage;
