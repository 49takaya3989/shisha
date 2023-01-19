import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { gqlClient } from 'src/libs/urql/requests'
import { MantineProvider } from '@mantine/core'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={gqlClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </Provider>
  )
}
