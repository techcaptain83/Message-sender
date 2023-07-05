import MainLayout from '@/components/layouts/MainLayout'
import '@/styles/nprogress.css'
import '@/styles/tailwind.css'
import 'focus-visible'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

NProgress.configure({
  showSpinner: false,
});

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {

  return (
    <RecoilRoot>
      <MainLayout>
        <Toaster />
        <Component {...pageProps} />
      </MainLayout>
    </RecoilRoot>
  )
}
