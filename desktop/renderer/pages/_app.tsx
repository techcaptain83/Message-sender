import { AppProps } from 'next/app';

import '../styles/globals.css';

import { Inter } from "next/font/google"
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/hooks/useAuth';
import MainLayout from '@/components/layouts/MainLayout';

const inter = Inter({
  subsets: ["latin"]
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <MainLayout>
          <Toaster />
          <div className={inter.className}>
            <Component {...pageProps} />
          </div>
        </MainLayout>
      </AuthProvider>
    </RecoilRoot>
  )
}

export default MyApp;
