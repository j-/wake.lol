import classNames from 'classnames';
import { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { IconInactive } from '../components/IconActive';
import { IconActive } from '../components/IconInactive';
import { IconSwatch } from '../components/IconSwatch';
import { IconWindow } from '../components/IconWindow';
import { FEATURES, PARAM_NEW_WINDOW } from '../constants';
import svgActive from '../icons/active.inline.svg';
import svgInactive from '../icons/inactive.inline.svg';
import styles from '../styles/Home.module.css';
import { useBackgroundColor } from '../use-background-color';
import { useIsInitialized } from '../use-is-initialized';
import { useIsNewWindow } from '../use-is-new-window';
import { usePageUrl } from '../use-page-url';
import { useTheme } from '../use-theme';
import { getWakeLockSentinel } from '../wake-lock-sentinel';

const HomePage: NextPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel>();
  const isInitialized = useIsInitialized();
  const isActive = isEnabled && sentinel != null;
  const color = useBackgroundColor();
  const pageUrl = usePageUrl();
  const isNewWindow = useIsNewWindow();
  const { next: nextTheme } = useTheme();

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
        <meta name="theme-color" content={color} />
      </Head>
      <div className={classNames(styles.container, isNewWindow && styles.containerNewWindow)}>
        <div className={styles.main}>
          <button
            type="button"
            className={classNames(styles.button, styles.mainButton)}
            onClick={handleClickToggle}
            title={isActive ? 'Wake lock is enabled, click to disable' : 'Wake lock is disabled, click to enable'}
            disabled={!isInitialized}
          >
            {
              isActive ?
                <IconActive
                  className={styles.icon}
                  width={64}
                  height={64}
                /> :
                <IconInactive
                  className={styles.icon}
                  width={64}
                  height={64}
                />
            }
          </button>
        </div>
        <div className={styles.actions}>
          {isNewWindow ? null : (
            <>
              <button
                type="button"
                className={classNames(styles.button)}
                onClick={handleClickOpenNewWindow}
                title="Open in new window"
              >
                <IconWindow
                  className={styles.icon}
                  width={64}
                  height={64}
                />
              </button>
              <button
                type="button"
                className={classNames(styles.button)}
                onClick={nextTheme}
                title="Change theme"
              >
                <IconSwatch
                  className={styles.icon}
                  width={64}
                  height={64}
                />
              </button>
            </>
          )}
        </div>
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
