import LogsTable from '@/components/history/LogsTable';
import { ILog } from '@/types';
import axios from 'axios.config';
import { saveAs } from 'file-saver';
import { GetServerSideProps } from 'next';
interface Props {
    log: ILog
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;
    const { data } = await axios.get(`/logs/${id}`);

    return {
        props: {
            log: data.log
        }
    }
}


export default function LogView({ log }: Props) {
    console.log(log);

    const downloadLogs = () => {
        const headers = ['First Name', 'Last Name', 'Phone Number', 'Status'];

        const csvContent = [
            headers.join(','),
            ...log.contacts.map((contact) => {
                return [
                    contact.firstName,
                    contact.lastName,
                    contact.phoneNumber,
                    contact.sent ? 'Sent' : 'Failed'
                ].join(',');
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        saveAs(blob, `logs.csv`);
    }

    return (
        <div className='w-full h-[91vh px-8 py-4'>
            <div className='w-full flex items-center justify-between'>
                <h1 className="text-base font-medium leading-6 text-gray-900">Logs</h1>
                <button
                    onClick={downloadLogs}
                    type="button"
                    className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                >
                    Download Logs
                </button>
            </div>
            <p className='pt-3 text-gray-600 max-w-4xl'>
                Logs for Messages sent to list <span className='text-gray-800 font-semibold'>{log.filename} </span>
                Due on <span className='text-gray-800 font-semibold'>{new Date(log.createdAt).toLocaleString()}</span>
            </p>
            <LogsTable contacts={log.contacts} />
        </div>
    )
}
