import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { gqlClient } from 'src/libs/urql/requests'
import { MantineProvider } from '@mantine/core'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Provider value={gqlClient}>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  )
}
