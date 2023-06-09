import 'react-toastify/dist/ReactToastify.css';
import 'utils/yup.config';
import 'dayjs/locale/ja';

import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { DehydratedState } from '@tanstack/react-query';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ConfirmModal from 'components/ConfirmModal';
import DataProvider from 'components/DataProvider';
import NextNProgress from 'components/ProgressBar';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { NextPage } from 'next';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import theme from 'theme';
import createEmotionCache from 'theme/createEmotionCache';
import queryClient from 'utils/queryClient';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode;
  auth?: {
    roles: string[];
  };
};

type AppPropsWithLayout<P = {}> = {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout<P>;
} & AppProps<P>;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(
  props: AppPropsWithLayout<{
    dehydratedState: DehydratedState;
  }>,
) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const [qClient] = useState(queryClient);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* Same as */}
        <QueryClientProvider client={qClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar
              theme="colored"
              closeButton={false}
            />
            <DataProvider />
            <NextNProgress />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              {getLayout(<Component {...pageProps} />, pageProps)}
              <ConfirmModal />
            </LocalizationProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  const isOwner = getCookie('isOwner', appContext.ctx);
  return { pageProps: { isOwnerSsr: isOwner } };
};
export default MyApp;
