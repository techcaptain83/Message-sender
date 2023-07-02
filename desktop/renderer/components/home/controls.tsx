import { showDeleteFileState } from "@/atoms";
import axios from "../../../axios.config";
import { ChangeEvent, useState } from 'react'
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { BiImport } from 'react-icons/bi'
import { FaFilter } from 'react-icons/fa'
import { MdOutlineUploadFile } from 'react-icons/md'
import { TfiLayoutColumn3Alt, TfiMenu } from 'react-icons/tfi'
import { useRecoilState } from "recoil";

export default function Controls() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showDeleteFile, setShowDeleteFile] = useRecoilState(showDeleteFileState);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('file', file);

        axios.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('File uploaded successfully:', response.data);
                // Perform any additional actions after successful file upload
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                // Handle any error that occurred during file upload
            });

    };

    return (
        <div className="flex flex-row items-center py-2 lg:py-4 justify-between lg:text-sm text-[9px]">
            <div className="flex flex-row gap-3">
                <button className="control">
                    <TfiLayoutColumn3Alt />
                    <p className='font-bold'>Column</p>
                </button>
                <button className="control">
                    <FaFilter />
                    <p className='font-bold'>Filter</p>
                </button>
                <button className="control">
                    <TfiMenu />
                    <p className='font-bold'>Density</p>
                </button>
                <button className="control">
                    <BiImport />
                    <p className='font-bold'>Export</p>
                </button>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <label htmlFor="fileInput" className="relative w-full h-full">
                    <button className="control">
                        <MdOutlineUploadFile className='text-green-500' />
                        <p className='font-bold'>Upload List</p>
                    </button>
                    <input
                        id="fileInput"
                        type="file"
                        // file formats
                        name="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className="absolute cursor-pointer top-0 z-10 left-0 opacity-0 w-full h-full "
                        onChange={handleFileUpload}
                    />
                </label>
            </div>
            <button
                onClick={() => setShowDeleteFile(true)}
                className="control hover:bg-red-500 text-red-500">
                <AiFillDelete />
                <p className='font-bold'>Remove List</p>
            </button>
            <div className=''>

            </div>
            {/* <div className="flex items-center flex-row font-bold gap-2">
                    <button><AiOutlineLeft /></button>
                    <button><AiOutlineRight /></button>
                d</div> */}
        </div>
    )
}
