import { selectedFileState } from '@/atoms'
import Controls from '@/components/home/controls'
import MesssageInput from '@/components/home/messsageInput'
import Navbar from '@/components/home/navbar'
import { Sidebar } from '@/components/home/sidebar'
import UsersTable from '@/components/home/usersTable'
import useFiles from '@/hooks/useFiles'
import axios from 'axios.config'
import Head from 'next/head'
import useSWR from 'swr'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'


export default function Index() {
  const { isFetching, files, error,getFileData } = useFiles();
  const selectedFile = useRecoilValue(selectedFileState);


  useEffect(() => {
    if (selectedFile) {
      getFileData(selectedFile._id)
    }
  }, [selectedFile])

  return (
    <>
      <Head>
        <title>Your dashboard - Chatmaid</title>
      </Head>
      <main className='w-full h-screen '>
        <Navbar />
        <div className='w-full h-full flex justify-between'>
          <div className='w-full h-full justify-between flex flex-col'>
            {selectedFile ? <UsersTable {...selectedFile} /> :
              <div></div>
            }
            <div className='w-full shadow-md  h-[24vh] px-6 bg-gray-50'>
              <Controls />
              <MesssageInput />
            </div>
          </div>
          <Sidebar files={files || []} />
        </div>
      </main>
    </>
  )
}  
