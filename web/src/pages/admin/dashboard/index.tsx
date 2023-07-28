import { selectedFileState } from '@/atoms'
import EmptyState from '@/components/EmptyState'
import Controls from '@/components/home/controls'
import MesssageInput from '@/components/home/messsageInput'
import { Sidebar } from '@/components/home/sidebar'
import UsersTable from '@/components/home/usersTable'
import useFiles from '@/hooks/useFiles'
import Head from 'next/head'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'



export default function Index() {
    const { isFetching, files, error, getFileData } = useFiles();


    useEffect(() => {
        const hasUsedApp = localStorage.getItem('has-used-app')
        if (hasUsedApp) return;
        toast.error(`ChatMaid's trial version permits usage for 7 days with a maximum of 20 contacts. Although you can upload more contacts, only 20 will be displayed. To remove these limitations, consider upgrading to the premium version. `, {
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
        });
        localStorage.setItem('has-used-app', "true");
    }, [])

    const selectedFile = useRecoilValue(selectedFileState);

    return (
        <>
            <Head>
                <title>Your dashboard - Chatmaid</title>
            </Head>
            <div className='w-full h-[91vh]  flex justify-between'>
                <div className='w-full h-full justify-between flex flex-col'>
                    {selectedFile ? <UsersTable /> :
                        <div className='w-full h-full flex items-center justify-center'>
                            <EmptyState title='no file selected' description='please select a file on right side or upload one.' />
                        </div>
                    }
                    {selectedFile && <div className='w-full shadow-md  h-[24vh] px-6 bg-gray-50'>
                        <Controls />
                        <MesssageInput />
                    </div>}
                </div>
                <Sidebar files={files || []} />
            </div>
        </>
    )
}  
