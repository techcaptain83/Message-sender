import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Empower yourself with Chatmaid enabling you to feel productive while your personal messaging &quot;maid&quot; handles the chatting for you. Invest today and unlock a new level of efficiency and convenience in your communication.
          </p>
          <div className='flex items-center justify-center sm:flex-row flex-col gap-4 w-full'>
            <Button href="/register?plan=free" color="white" className="mt-10 md:shrink-0">
              Go to free trial
            </Button>
            <Button href="/register?plan=premium" color="white" className="sm:mt-10 md:shrink-0">
              Go to shared premium
            </Button>
            <Button href="/register?plan=enterprise" color="white" className="sm:mt-10 md:shrink-0">
              Go to exclusive enterprise
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
