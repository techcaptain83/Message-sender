import UserDashboardLayout from '@/components/layouts/UserDashboardLayout'
import Head from 'next/head'
import React from 'react'

export default function Reservations() {
  return (
    <UserDashboardLayout>
      <Head>
          <title>Chatmaid - Reservations</title>
      </Head>
    </UserDashboardLayout>
  )
}
