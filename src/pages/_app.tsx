import type { AppType } from 'next/app';
import Head from 'next/head';
import svgInactive from '../icons/inactive.svg';
import '../styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href={svgInactive.src} type='image/svg+xml' />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
