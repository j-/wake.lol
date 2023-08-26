import classNames from 'classnames';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './App.module.css';
import { IconInactive } from './components/IconActive';
import { IconActive } from './components/IconInactive';
import { IconSwatch } from './components/IconSwatch';
import { IconWindow } from './components/IconWindow';
import { CSS_VAR_BG, FEATURES, PARAM_NEW_WINDOW } from './constants';
import { useIsInitialized } from './use-is-initialized';
import { useIsNewWindow } from './use-is-new-window';
import { useIsStandalone } from './use-is-standalone';
import { usePageUrl } from './use-page-url';
import { useTheme } from './use-theme';
import { getWakeLockSentinel } from './wake-lock-sentinel';
import iconActive from '/active.svg?raw';
import iconInactive from '/inactive.svg?raw';

const iconActiveURL = `data:image/svg+xml;base64,${btoa(iconActive)}`;
const iconInactiveURL = `data:image/svg+xml;base64,${btoa(iconInactive)}`;

const App: FC = () => {
  const iconRef = useRef<HTMLLinkElement>();
  const [isEnabled, setIsEnabled] = useState(false);
  const [sentinel, setSentinel] = useState<WakeLockSentinel>();
  const isInitialized = useIsInitialized();
  const isActive = isEnabled && sentinel != null;
  const pageUrl = usePageUrl();
  const isNewWindow = useIsNewWindow();
  const isStandalone = useIsStandalone();
  const hideActions = isNewWindow || isStandalone;
  const { next: nextTheme } = useTheme();

  const showWakeLockEnabled = useCallback(() => {
    document.documentElement.classList.remove(styles.isInactive);
    document.documentElement.classList.add(styles.isActive);
    document.title = '[ENABLED] wake.lol is enabled, sleep is disabled';
    document.head.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue(CSS_VAR_BG));
    iconRef.current?.setAttribute('href', iconActiveURL);
  }, []);

  const showWakeLockDisabled = useCallback(() => {
    document.documentElement.classList.remove(styles.isActive);
    document.documentElement.classList.add(styles.isInactive);
    document.title = 'wake.lol';
    document.head.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue(CSS_VAR_BG));
    iconRef.current?.setAttribute('href', iconInactiveURL);
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
      document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')
    );

    for (const icon of icons) {
      icon.parentElement?.removeChild(icon);
    }

    const icon = document.createElement('link');
    icon.setAttribute('rel', 'icon');
    icon.setAttribute('href', iconInactiveURL);
    iconRef.current = icon;
    document.head.appendChild(icon);

    return () => {
      for (const icon of icons) {
        document.head.appendChild(icon);
      }
      document.head.removeChild(icon);
    };
  }, []);

  return (
    <div className={classNames(styles.container, hideActions && styles.containerNewWindow)}>
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
        {hideActions ? null : (
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
  );
};

export default App;
