import type { AppType } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import svgInactive from '../icons/inactive.inline.svg';
import '../styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href={svgInactive} type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="wake.lol" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="wake.lol" />
        <meta name="description" content="Keep your screen awake without installing anything. A handy little website with a silly little name." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-PLZRPEP9E7" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PLZRPEP9E7');
          `,
        }}
      />
    </>
  );
};

export default App;
