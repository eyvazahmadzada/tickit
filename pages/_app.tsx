import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { store } from '../app/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>TickIt</title>
        <meta name="title" content="TickIt" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
