import { AppProps } from 'next/app';

import '../styles/globals.css';

import { Inter } from "next/font/google"
import { RecoilRoot } from 'recoil';

const inter = Inter({
  subsets: ["latin"]
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  )
}

export default MyApp;
