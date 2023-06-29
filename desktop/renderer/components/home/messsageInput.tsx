import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { BsSendFill } from 'react-icons/bs';
import 'react-quill/dist/quill.snow.css';

export default function MesssageInput() {

    const [value, setValue] = useState('');
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

    return (

            <div className='px-2 relative w-full'>
                <ReactQuill value={value} onChange={setValue} />
            </div>
    )
}
