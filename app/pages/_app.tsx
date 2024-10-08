// _app.tsx
import '../styles/globals.css'; // Adjust path as needed

import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
