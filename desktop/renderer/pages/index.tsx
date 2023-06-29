import Controls from '@/components/home/controls'
import MesssageInput from '@/components/home/messsageInput'
import Navbar from '@/components/home/navbar'
import { Sidebar } from '@/components/home/sidebar'
import UsersTable from '@/components/home/usersTable'
import Pagination from '@/components/pagination'
import Head from 'next/head'
import React from 'react'

export default function Index() {
  return (
    <>
      <Head>
        <title>Your dashboard - Chatmaid</title>
      </Head>
      <main className='w-full h-screen '>
        <Navbar />
        <div className='w-full h-full flex justify-between'>
          <div className='w-full h-full justify-between flex flex-col'>
            <UsersTable />
            <div className='w-full shadow-md  h-[24vh] px-6 bg-gray-50'>
              <Controls />
              <MesssageInput />
            </div>
          </div>
          <Sidebar />
        </div>
      </main>
    </>
  )
}
