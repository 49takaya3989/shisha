import 'styles/globals.scss'
import type { AppProps } from 'next/app'

import { ClerkProvider } from '@clerk/nextjs'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'urql'

import { gqlClient } from 'src/libs/urql/requests'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          footer: 'hidden',
        },
      }}
      {...pageProps}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Provider value={gqlClient}>
          <Component {...pageProps} />
        </Provider>
      </MantineProvider>
    </ClerkProvider>
  )
}

export default App
