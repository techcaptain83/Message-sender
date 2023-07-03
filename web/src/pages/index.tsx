import Head from 'next/head'

import { CallToAction } from '@/components/CallToAction'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { TermsAndConditions } from '@/components/TermsAndConditions'
import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatmaid - Whatsapp automation made easy for everyone</title>
        <meta
          name="description"
          content="The simple, friendly, and powerful solution for personalized Whatsapp messaging."
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
        <Pricing />
        <TermsAndConditions />
      </main>
      <Footer />
    </>
  )
}
