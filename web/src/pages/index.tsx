import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { TermsAndConditions } from '@/components/TermsAndConditions'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatmaid - Whatsapp automation made easy for everyone</title>
        <meta
          name="description"
          content="Most whatsapp providers  are accurate, but hard to use. We make the opposite trade-off, and hope you don’t get lost."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        {/* <SecondaryFeatures /> */}
        <Testimonials />
        <CallToAction />
        {/* <Faqs /> */}
        <TermsAndConditions />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
