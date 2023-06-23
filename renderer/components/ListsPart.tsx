"use client";
import React, { useMemo, useState } from 'react'
import { BsCheckSquare } from "react-icons/bs"
import { TfiLayoutColumn3Alt, TfiMenu } from "react-icons/tfi"
import { FaFilter } from "react-icons/fa"
import { BiExport } from 'react-icons/bi'
import { MdOutlineUploadFile } from "react-icons/md"
import { AiFillDelete, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const ListsPart = () => {
    const [value, setValue] = useState('');
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    return (
        <div className='h-full bg-[#10131A] text-white'>
            <div className="h-[65%] px-1.5 md:px-3  pt-5 lg:text-base md:text-sm text-[10px] ">
                <table>
                    <thead>
                        <tr>
                            <td><BsCheckSquare /></td>
                            <td className='font-bold border--[3px] border-white px-10'>ID</td>
                            <td className='font-bold border-l-[3px] border-white px-10'>Home</td>
                            <td className='font-bold border-l-[3px] border-white px-10'>Last Name</td>
                            <td className='font-bold border-l-[3px] border-white px-10'>Display Name</td>
                            <td className='font-bold border-l-[3px] border-white px-10'>Phone Number</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className='py-2'><BsCheckSquare /></td>
                            <td className='py-2'></td>
                            <td className='py-2'></td>
                            <td className='py-2'></td>
                            <td className='py-2'></td>
                            <td className='py-2'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="h-[35%]  w-full border-t-[1px] border-gray-400">
                <div className="flex flex-row items-center p-2 lg:p-4 justify-between lg:text-base text-[10px]">
                    <div className="flex flex-row gap-3">
                        <button className="flex items-center flex-row text-blue-500 gap-2 p-2 rounded-md hover:bg-[#171C22]">
                            <TfiLayoutColumn3Alt />
                            <p className='font-bold'>Column</p>
                        </button>
                        <button className="flex items-center flex-row text-blue-500 gap-2 p-2 rounded-md hover:bg-[#171C22]">
                            <FaFilter />
                            <p className='font-bold'>Filter</p>
                        </button>
                        <button className="flex items-center flex-row text-blue-500 gap-2 p-2 rounded-md hover:bg-[#171C22]">
                            <TfiMenu />
                            <p className='font-bold'>Density</p>
                        </button>
                        <button className="flex items-center flex-row text-blue-500 gap-2 p-2 rounded-md hover:bg-[#171C22]">
                            <BiExport />
                            <p className='font-bold'>Export</p>
                        </button>
                    </div>
                    <div className="flex flex-row gap-4">
                        <button className="flex items-center flex-row  gap-2 p-2 rounded-md hover:bg-[#171C22]">
                            <MdOutlineUploadFile className='text-green-500' />
                            <p className='font-bold'>Upload List</p>
                        </button>
                        <button className="flex items-center flex-row gap-2 p-2 rounded-md hover:bg-[#171C22]">
                            <AiFillDelete className='text-red-500' />
                            <p className='font-bold'>Remove List</p>
                        </button>
                        <div className="flex items-center flex-row gap-2">
                            <p className='font-bold'>Rows per page : </p>
                            <input type={"number"} defaultValue={10} className="bg-inherit w-20" />
                            <p>0  - 0 of 0</p>
                        </div>
                        <div className="flex items-center flex-row font-bold gap-2">
                            <button><AiOutlineLeft /></button>
                            <button><AiOutlineRight /></button>
                        </div>
                    </div>
                </div>
                <div className='px-2'>
                    <ReactQuill theme="snow" value={value} onChange={setValue} className="bg-[#20232A]" />
                </div>
            </div>
        </div>
    )
}

export default ListsPart