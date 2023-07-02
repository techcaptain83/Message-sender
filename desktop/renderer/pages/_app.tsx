import { AppProps } from 'next/app';

import '../styles/globals.css';

import { Inter } from "next/font/google"
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ["latin"]
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Toaster />
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  )
}

export default MyApp;
