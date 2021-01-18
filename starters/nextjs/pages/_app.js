import React from 'react'
import Head from 'next/head'
import '../sass/frontend/_main.scss'

const App = ({ Component, pageProps }) => (
  <React.Fragment>
    <Head>
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
      />
    </Head>
    <Component {...pageProps} />
  </React.Fragment>
)

export default App
