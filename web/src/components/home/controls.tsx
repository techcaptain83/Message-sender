import { showDeleteFileState } from "@/atoms";
import useFiles from "@/hooks/useFiles";
import { AiFillDelete } from 'react-icons/ai';
import { BiImport } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import { useRecoilState } from "recoil";
import Loader from "../Loader";
import { messageState } from "@/store/atoms";

export default function Controls() {
    const [_showDeleteFile, setShowDeleteFile] = useRecoilState(showDeleteFileState);
    const { downloadingFile, downloadFile } = useFiles();
    const [message, setMessage] = useRecoilState(messageState);

    return (
        <div className="flex items-center w-full py-2 lg:py-4 justify-between lg:text-sm text-[9px]">
            <div className="flex flex-row gap-3">
                <button className="control"
                    onClick={() => {
                        document.getElementById('filterInput')?.focus();
                    }}
                >
                    <FaFilter />
                    <p className='font-bold'>Filter</p>
                </button>
                <button
                    onClick={() => downloadFile()}
                    disabled={downloadingFile}
                    className="control">
                    {downloadingFile ?
                        <Loader />
                        : <>
                            <BiImport />
                            <p className='font-bold'>Export File</p>
                        </>
                    }
                </button>
                <button
                    onClick={() => setMessage(message + '[name]')}
                    className="px-4 py-2 text-white bg-green-500 rounded-md">
                    <p className='font-bold'>Insert Display Name</p>
                </button>
                <button
                    onClick={() => setMessage(message + '[display_text]')}
                    className="px-4 py-2 text-white bg-green-500 rounded-md">
                    <p className='font-bold'>Insert Display Text</p>
                </button>
            </div>
            <div className="flex flex-row gap-4 items-center">
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
