import { logToDeleteState, showDeleteLogState } from '@/atoms';
import { ILog } from '@/types';
import Link from 'next/link';
import { useRecoilState } from 'recoil';


export default function ActivitiesList({ logs }: { logs: ILog[] }) {
    const [_showDelLog, setShowDeleteLog] = useRecoilState(showDeleteLogState);
    const [_logToDelete, setLogToDelete] = useRecoilState(logToDeleteState);

    return (
        <ul role="list" className={`divide-y divide-gray-300 h-[65vh] overflow-y-auto ${logs.length===0 && "flex items-center justify-center"}`}>
            {logs?.length > 0 ? logs.map((log: ILog, index) => (
                <li key={index} className="flex items-center justify-between gap-x-6 py-5">
                    <div className="min-w-0">
                        <div className="flex items-start gap-x-3">
                            <p className="font-semibold leading-6 text-gray-900">List name : {log.filename}</p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500">
                            <p className="whitespace-nowrap">
                                Due on <time dateTime={log.createdAt}>{new Date(log.createdAt).toLocaleString()}</time>
                            </p>
                            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                <circle cx={1} cy={1} r={1} />
                            </svg>
                            <div className='flex items-center gap-2'>
                                <p className='text-green-500'>{log.sentCount} sent</p>  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                    <circle cx={1} cy={1} r={1} />
                                </svg> <p className='text-red-500'>{log.failedCount} failed</p>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-none items-center gap-x-4">
                        <Link
                            href={`/dashboard/history/${log._id}`}
                            className="hidden rounded-md bg-white px-2.5 py-1.5  font-semibold text-gray-900 shadow-sm ring-1 text-sm ring-inset ring-gray-300 hover:bg-gray-50 sm:block capitalize"
                        >
                            View logs<span className="sr-only">, {log.filename}</span>
                        </Link>
                        <button
                            onClick={() => {
                                setLogToDelete(log);
                                setShowDeleteLog(true);
                            }}
                            className="hidden rounded-md bg-red-400 px-2.5 py-1.5  text-white font-semibold shadow-sm ring-1 text-sm ring-inset ring-gray-300 hover:bg-red-500 sm:block"
                        >
                            Delete<span className="sr-only">, {log.filename}</span>
                        </button>
                    </div>
                </li>
            )) :
                <div
                    className="relative block w-fit rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                        />
                    </svg>
                    <span className="mt-2 block text-sm font-semibold text-gray-900">You haven&apos;t sent any message to any list.</span>
                </div>
            }
        </ul>
    )
}
