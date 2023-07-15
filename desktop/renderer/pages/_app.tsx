import { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/nprogress.css';
import { Poppins } from "next/font/google"
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/hooks/useAuth';
import MainLayout from '@/components/layouts/MainLayout';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Router from 'next/router';
import NProgress from "nprogress";

const inter = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800']
});

NProgress.configure({
  showSpinner: false,
});

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <PayPalScriptProvider options={{
      // clientId: process.env.PAYPAL_CLIENT_ID,
      clientId: "test",
      currency: "USD",
      components: "buttons"
    }}>
      <RecoilRoot>
        <AuthProvider>
          <MainLayout>
            <Toaster />
            <div className={` ${inter.className}`}>
              <Component {...pageProps} />
            </div>
          </MainLayout>
        </AuthProvider>
      </RecoilRoot>
    </PayPalScriptProvider>
  )
}

export default MyApp;
