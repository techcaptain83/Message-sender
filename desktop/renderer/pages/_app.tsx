import { AppProps } from 'next/app';

import '../styles/globals.css';

import { Poppins } from "next/font/google"
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/hooks/useAuth';
import MainLayout from '@/components/layouts/MainLayout';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
PayPalScriptProvider
const inter = Poppins({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800']
});
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <PayPalScriptProvider options={{
      // clientId: process.env.PAYPAL_CLIENT_ID,
      clientId:"test",
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
