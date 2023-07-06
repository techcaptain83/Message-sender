import { selectedUsersState } from '@/atoms';
import { sendMessage } from '@/utils/messaging';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import { useRecoilValue } from 'recoil';
import Loader from '../Loader';

export default function MesssageInput() {
    const selectedUsers = useRecoilValue(selectedUsersState);

    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {

        if (value.trim() === '') return;
        if (selectedUsers.length === 0) {
            toast.error('Please select at least one user to send a message to.');
            return;
        }
        setLoading(true);
        selectedUsers.forEach(async user => {
            await sendMessage(value, `${user.countryCode}${user.phoneNumber}`.trim())
        });
        setLoading(false);
    }

    return (

        <div className='relative w-full px-4 py-3 bg-gray-100 flex items-center gap-2'>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type a message"
                className=' w-full text-sm h-full bg-gray-50/75 rounded px-4 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100'
            />
            <button
                disabled={value.trim() === '' || loading}
                className=' h-full p-2 bg-gray-50/75'>
                {loading ?
                    <Loader /> :
                    <PaperAirplaneIcon width={30} className={`text-gray-400
                ${value.trim() === '' ? "hover:cursor-not-allowed" : "hover:text-gray-600"} `} onClick={handleSubmit} />}
            </button>
        </div>
    )
}
