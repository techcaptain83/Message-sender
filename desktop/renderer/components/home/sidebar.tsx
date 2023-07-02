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
  }, [selectedFile])

  return (
    <div className='h-full shadow w-[28vw] pt-4 px-4 '>
      <div className='p-2 space-y-4'>
        <h2 className='text-lg text-gray-600'>
          Recently uploaded files
        </h2>
        {files.length > 0 ? <div className='flex flex-col gap-5'>
          {
            files.map((file, index) => (
              <div
                role='button'
                onClick={() => setSelectedFile(file)}
                key={index} className={`flex gap-2 hover:bg-gray-100 items-start ${selectedFile?._id === file._id && "bg-gray-100"}`}>
                <DocumentTextIcon width={40} className='text-gray-500 shrink-0' />
                <div className=''>
                  <p className='text-base'>{file.filename}</p>
                  <p className='text-gray-500 text-xs md:text-sm'><span>uploaded at : {new Date(file.createdAt).toLocaleString()}</span>
                    {/* <span className='px-1'>.</span> <span>12 people</span> */}
                  </p>
                </div>
              </div>
            ))
          }
        </div> :
          <div className='text-center text-gray-500'>
            you haven't updloaded any files yet
          </div>
        }
      </div>
    </div>
  )
}
