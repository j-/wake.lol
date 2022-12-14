import type { AppType } from 'next/app';
import styles from '../styles/body.module.css';
import '../styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
