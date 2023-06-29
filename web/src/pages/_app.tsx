import DashboardLayout from '@/components/layouts/DashboardLayout'
import '@/styles/tailwind.css'
import '@/styles/nprogress.css'
import 'focus-visible'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import Router from 'next/router'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
});

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <RecoilRoot>
      <>
        <Toaster />
        {(router.pathname.includes('/c') || router.pathname.includes('/a')) ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </>
    </RecoilRoot>
  )
}
