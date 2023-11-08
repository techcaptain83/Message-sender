/* eslint-disable react-hooks/exhaustive-deps */
import { selectedFileState } from '@/atoms';
import { IFile } from '@/types'
import { DocumentTextIcon } from '@heroicons/react/20/solid'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';


interface IProps {
  files: IFile[];
}

export const Sidebar = ({ files }: IProps) => {
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);

  useEffect(() => {
    if (!selectedFile && files.length > 0) {
      setSelectedFile(files[0])
    }
  }, [selectedFile]);

  return (
    <div className='h-full shadow w-[14vw] pt-4'>
      <div className='p-2 space-y-4'>
        <h2 className='text-gray-600'>
          Recently uploaded files
        </h2>
        {files.length > 0 ? <div className='flex flex-col gap-5'>
          {
            files.map((file, index) => (
              <div
                role='button'
                onClick={() => setSelectedFile(file)}
                key={index} className={`flex hover:bg-gray-100 items-start ${selectedFile?._id === file._id && "bg-gray-100"}`}>
                <DocumentTextIcon width={30} className='text-gray-500 shrink-0 m-2' />
                <div className=''>
                  <p className='text-sm'>{file?.filename}</p>
                  <p className='text-gray-500 text-sm '>
                    uploaded at : {new Date(file?.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          }
        </div> :
          <div className='text-center text-gray-500'>
            you haven&apos;t updloaded any files yet
          </div>
        }
      </div>
    </div>
  )
}
