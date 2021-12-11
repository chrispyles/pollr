import { AppProps } from 'next/app';

import { ReactElement } from 'react';

import '../styles/global.scss';


export default function App({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}
