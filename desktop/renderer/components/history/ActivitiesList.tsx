import { logToDeleteState, showDeleteLogState } from '@/atoms';
import { ILog } from '@/types';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

const logs: ILog[] = [
    {
        _id: '1',
        filename: 'Employees.csv',
        sentCount: 20,
        failedCount: 43,
        createdAt: "2023-07-15T15:52:00.506Z",
        contacts: []
    }
]


export default function ActivitiesList() {
    const [_showDelLog, setShowDeleteLog] = useRecoilState(showDeleteLogState);
    const [_logToDelete, setLogToDelete] = useRecoilState(logToDeleteState);

    return (
        <ul role="list" className="divide-y divide-gray-300 h-[70vh] overflow-y-auto">
            {new Array(12).fill(logs[0]).map((log: ILog, index) => (
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
                            href={`/history/${log._id}`}
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
            ))}
        </ul>
    )
}
