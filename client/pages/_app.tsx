import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {MeetingProvider} from "amazon-chime-sdk-component-library-react";
import React from "react";
import {darkTheme} from 'amazon-chime-sdk-component-library-react'
import {ThemeProvider} from 'styled-components';


const MyApp = ({ Component, pageProps }: AppProps) =>  {
  return (
      <ThemeProvider theme={darkTheme}>
          <MeetingProvider>
              <Component {...pageProps} />
          </MeetingProvider>
      </ThemeProvider>
  )
}

export default MyApp
