import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { gqlClient } from 'src/libs/urql/requests'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={gqlClient}>
      <Component {...pageProps} />
    </Provider>
  )
}
