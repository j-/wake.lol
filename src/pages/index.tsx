import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FEATURES, PARAM_NEW_WINDOW } from '../constants';
import svgActive from '../icons/active.inline.svg';
import svgInactive from '../icons/inactive.inline.svg';
import svgNewWindow from '../icons/window.inline.svg';
import styles from '../styles/Home.module.css';
import { useColors } from '../use-colors';
import { useIsInitialized } from '../use-is-initialized';
import { useIsNewWindow } from '../use-is-new-window';
import { usePageUrl } from '../use-page-url';
import { getWakeLockSentinel } from '../wake-lock-sentinel';

const HomePage: NextPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel>();
  const isInitialized = useIsInitialized();
  const isActive = isEnabled && sentinel != null;
  const { colorActive, colorInactive } = useColors();
  const pageUrl = usePageUrl();
  const isNewWindow = useIsNewWindow();

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
    const icons = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel~=icon]')
    );

    for (const icon of icons) {
      icon.parentElement?.removeChild(icon);
    }

    return () => {
      for (const icon of icons) {
        document.head.appendChild(icon);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>{isActive ? '[ENABLED] wake.lol is enabled, sleep is disabled' : 'wake.lol'}</title>
        <link rel="icon" type="image/svg+xml" href={isActive ? svgActive : svgInactive} />
        <meta name="theme-color" content={isActive ? colorActive : colorInactive} />
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
