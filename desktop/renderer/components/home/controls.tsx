import { activeUsersState, selectedUsersState, showDeleteFileState, showUploadFileState } from "@/atoms";
import useFiles from "@/hooks/useFiles";
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import { AiFillDelete } from 'react-icons/ai';
import { BiImport } from 'react-icons/bi';
import { FaColumns, FaFilter } from 'react-icons/fa';
import { MdOutlineUploadFile } from 'react-icons/md';
import { TfiMenu } from 'react-icons/tfi';
import { useRecoilState, useRecoilValue } from "recoil";
import Loader from "../Loader";
import { useEffect, useState } from "react";

export default function Controls() {
    const [_showDeleteFile, setShowDeleteFile] = useRecoilState(showDeleteFileState);
    const [_showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState);
    const { downloadingFile, downloadFile } = useFiles();

    return (
        <div className="flex items-center w-full py-2 lg:py-4 justify-between lg:text-sm text-[9px]">
            <div className="flex flex-row gap-3">
                {/* <button className="control" onClick={() => setSelectedUsers(activeUsers)} >
                    <DocumentCheckIcon width={20} />
                    <p className='font-bold'>Select All</p>
                </button> */}
                <button className="control">
                    <FaColumns />
                    <p className='font-bold'>Filter</p>
                </button>
                <button className="control">
                    <FaFilter />
                    <p className='font-bold'>Filter</p>
                </button>
                <button className="control">
                    <TfiMenu />
                    <p className='font-bold'>Density</p>
                </button>
                <button
                    onClick={() => downloadFile()}
                    disabled={downloadingFile}
                    className="control">
                    {downloadingFile ?
                        <Loader />
                        : <>
                            <BiImport />
                            <p className='font-bold'>Export</p>
                        </>
                    }
                </button>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <label htmlFor="fileInput" className="relative w-full h-full">
                    <button
                        onClick={() => setShowUploadFile(true)}
                        className="control">
                        <MdOutlineUploadFile className='text-green-500' />
                        <p className='font-bold'>Upload List</p>
                    </button>
                </label>
                <button
                    onClick={() => setShowDeleteFile(true)}
                    className="control hover:bg-red-500 text-red-500 shrink-0">
                    <AiFillDelete />
                    <p className='font-bold'>Remove List</p>
                </button>
            </div>
        </div>
    )
}
