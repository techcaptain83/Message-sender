import { selectedFileState, showDeleteFileState, showUpgradeToPremiumState, showUploadFileState } from '@/atoms'
import EmptyState from '@/components/EmptyState'
import Controls from '@/components/home/controls'
import MesssageInput from '@/components/home/messsageInput'
import Navbar from '@/components/home/navbar'
import { Sidebar } from '@/components/home/sidebar'
import UsersTable from '@/components/home/usersTable'
import DeleteFile from '@/components/modals/DeleteFile'
import UpgradeToPremium from '@/components/modals/UpgradeToPremium'
import UploadFile from '@/components/modals/UploadFile'
import useFiles from '@/hooks/useFiles'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'


export default function Index() {
  const { isFetching, files, error, getFileData } = useFiles();
  const selectedFile = useRecoilValue(selectedFileState);
  const showDeleteFile = useRecoilValue(showDeleteFileState);
  const showUploadFile = useRecoilValue(showUploadFileState);
  const showUpgrade = useRecoilValue(showUpgradeToPremiumState);

  return (
    <>
      <Head>
        <title>Your dashboard - Chatmaid</title>
      </Head>
      <main className='w-full h-screen '>
        {showDeleteFile && <DeleteFile />}
        {showUploadFile && <UploadFile />}
        {showUpgrade && <UpgradeToPremium />}
        <Navbar />
        <div className='w-full h-[91vh] flex justify-between'>
          <div className='w-full h-full justify-between flex flex-col'>
            {selectedFile ? <UsersTable /> :
              <div className='w-full h-full flex items-center justify-center'>
                <EmptyState title='no file selected' description='please select a file on left side or upload one.' />
              </div>
            }
            {selectedFile && <div className='w-full shadow-md  h-[24vh] px-6 bg-gray-50'>
              <Controls />
              <MesssageInput />
            </div>}
          </div>
          <Sidebar files={files || []} />
        </div>
      </main>
    </>
  )
}  
