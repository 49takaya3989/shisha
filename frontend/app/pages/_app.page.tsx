import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { gqlClient } from 'src/libs/urql/requests'
import { MantineProvider } from '@mantine/core'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { ROUTE } from 'helper/constant/route'

const publicPages = [ROUTE.HOME, '/blog/[id]']

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter()
  const isPublicPage = publicPages.includes(pathname)

  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Provider value={gqlClient}>
          {isPublicPage ? (
            <Component {...pageProps} />
          ) : (
            <>
              <SignedIn>
                <Component {...pageProps} />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          )}
        </Provider>
      </MantineProvider>
    </ClerkProvider>
  )
}

export default App
