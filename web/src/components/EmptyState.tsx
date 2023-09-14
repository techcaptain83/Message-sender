import { showUploadFileState } from '@/atoms';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useRecoilState } from 'recoil';


interface IProps {
    title: string;
    description: string;
}
export default function EmptyState({ title, description }: IProps) {
    const [showUploadFile,setShowUploadFile]=useRecoilState(showUploadFileState);
    return (
        <div className="text-center ">
            <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
            </svg>
            <h3 className="mt-2 font-semibold text-gray-900 capitalize">{title}</h3>
            <p className="mt-1  text-gray-500 capitalize">{description}</p>
            <div className="mt-6">
                <button
                onClick={()=>setShowUploadFile(true)}
                    type="button"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    upload new file
                </button>
            </div>
        </div>
    )
}
