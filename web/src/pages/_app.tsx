import MainLayout from '@/components/layouts/MainLayout'
import '@/styles/nprogress.css'
import '@/styles/tailwind.css'
import 'focus-visible'
import { AppProps } from 'next/app'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AuthProvider } from '@/hooks/useAuth'
import { AuthLayout } from '@/components/AuthLayout'


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
    <PayPalScriptProvider options={{
      clientId: "AUVWWFSEca-zzdzcIg_Vv_mFln0SsS1sbpTMC2DF2LvfFxadZX6OVE3s468rCmtzAQo2o7Z0kiZgkr2E",
      currency: "USD",
      components: "buttons"
    }}>
      <RecoilRoot>
        <AuthProvider>
          <MainLayout>
            <Toaster />
            {
              router.pathname === "/login" || router.pathname === "/register" ?
                <AuthLayout>
                  <Component {...pageProps} />
                </AuthLayout> :
                <Component {...pageProps} />
            }
          </MainLayout>
        </AuthProvider>
      </RecoilRoot>
    </PayPalScriptProvider>
  )
}
