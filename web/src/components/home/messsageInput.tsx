import { phoneConnectedState, selectedUsersState, showScanCodeState, uploadedFileState } from '@/atoms';
import useMedia from '@/hooks/useMedia';
import { PaperAirplaneIcon, PaperClipIcon, PhotoIcon, SpeakerWaveIcon, VideoCameraIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import Loader from '../Loader';
import useMessages from '@/hooks/useMessages';

export default function MesssageInput() {
    const selectedUsers = useRecoilValue(selectedUsersState);
    const { uploadMedia, uploadingAudio, uploadingImage, uploadingVideo } = useMedia();
    const { sendingMessages, sendBulkMessages } = useMessages();
    const [value, setValue] = useState('');
    const [showUploadMedia, setShowUploadMedia] = useState(false);
    const [uploadedFile, setUploadedFile] = useRecoilState(uploadedFileState);
    const [showScanCode, setShowScanCode] = useRecoilState(showScanCodeState);
    const [phoneConnected, setPhoneConnected] = useRecoilState(phoneConnectedState);
    const uploadMediaRef = useRef<HTMLDivElement>(null);
    const showUploadMediabuttonRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = () => {

        if (selectedUsers.length === 0) {
            toast.error('Please select at least one contact to send a message to.');
        }
        else if (!phoneConnected) {
            toast.error("you have to connect your phone first!");
            setTimeout(() => {
                setShowScanCode(true);
            }, 1000);
        }
        else if (!uploadedFile) {
            sendBulkMessages(selectedUsers, {
                body: value
            });
            setValue('');
        } else if (uploadedFile.type.includes('image')) {
            sendBulkMessages(selectedUsers, {
                image: uploadedFile?.fileUrl,
                caption: value.trim().length > 0 ? value : undefined
            });
            setValue('');
            setUploadedFile(null);
        } else if (uploadedFile.type.includes('video')) {
            sendBulkMessages(selectedUsers, {
                video: uploadedFile?.fileUrl,
                caption: value.trim().length > 0 ? value : undefined
            })
            setValue("");
            setUploadedFile(null);
        } else if (uploadedFile.type.includes('audio')) {
            sendBulkMessages(selectedUsers, {
                audio: uploadedFile?.fileUrl
            });
            setValue("");
            setUploadedFile(null);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ((uploadMediaRef.current && !showUploadMediabuttonRef.current?.contains(event.target as Node)) && !uploadMediaRef.current.contains(event.target as Node)) {
                setShowUploadMedia(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [uploadMediaRef]);


    return (

        <div className='relative w-full px-4 py-3 bg-gray-100 flex items-center gap-2'>
            <div className='relative'>
                {!uploadedFile && <button
                    ref={showUploadMediabuttonRef}
                    onClick={() => setShowUploadMedia(!showUploadMedia)}
                    className=' h-full p-2 bg-gray-50/75'>
                    <PaperClipIcon width={30} className={`text-gray-400  hover:text-gray-600`} />
                </button>}
                {
                    (showUploadMedia && !uploadedFile) &&
                    <div ref={uploadMediaRef} className='flex  absolute bottom-8 shadow-md left-0 p-2 rounded-md flex-col gap-2  bg-white w-max'>
                        <button className='bg-gray-50/75 relative p-2 rounded-full flex items-center gap-2 text-gray-400 hover:text-gray-600'>
                            <PhotoIcon width={30} />
                            {uploadingImage ? <p>uploading...</p> : <p>Upload Image</p>}
                            {!uploadingImage && <input
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        uploadMedia(e.target.files[0], 'image')
                                    }
                                }}
                                type="file" accept='
                            image/png, image/jpeg, image/jpg, image/gif
                            ' className='absolute top-0 left-0 w-full h-full opacity-0' />}
                        </button>
                        <button className='bg-gray-50/75 p-2 rounded-full flex relative items-center gap-2 text-gray-400 hover:text-gray-600'>
                            <VideoCameraIcon width={30} />
                            {uploadingVideo ? <p>uploading...</p> : <p>Upload video</p>}
                            {!uploadingVideo && <input
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        uploadMedia(e.target.files[0], 'video')
                                    }
                                }}
                                type="file" accept='
                            video/mp4, video/mkv, video/avi, video/mov
                            ' className='absolute top-0 left-0 w-full h-full opacity-0' />}
                        </button>
                        <button className='bg-gray-50/75 p-2 rounded-full relative flex items-center gap-2 text-gray-400 hover:text-gray-600'>
                            <SpeakerWaveIcon width={30} />
                            {uploadingAudio ? <p>uploading...</p> : <p>Upload audio</p>}
                            {!uploadingAudio && <input
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        uploadMedia(e.target.files[0], 'audio')
                                    }
                                }}
                                type="file" accept='
                            audio/mp3, audio/wav, audio/mpeg
                            ' className='absolute top-0 left-0 w-full h-full opacity-0' />}
                        </button>
                    </div>
                }
            </div>
            {uploadedFile ?
                <div className='w-full bg-white p-2 text-gray-600 flex lg:items-center flex-col lg:flex-row  gap-3'>
                    <div className='flex items-center'>
                        <p>{uploadedFile.filename}</p>
                        <button onClick={() => {
                            setUploadedFile(null)
                        }} className='ml-2 text-red-500 hover:text-white hover:bg-red-400 p-1 bg-gray-100 rounded-full '>
                            <XMarkIcon width={20} />
                        </button>
                    </div>
                    {(uploadedFile.type.includes('image') || uploadedFile.type.includes('video')) &&
                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder='Add Caption'
                            className=' w-full text-sm h-full bg-gray-50/75 border rounded px-4 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100'
                        />}
                </div> :
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type a message"
                    className=' w-full text-sm h-full bg-gray-50/75 rounded px-4 py-2 outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100'
                />}
            <button
                disabled={(value.trim() === '' || sendingMessages) && !uploadedFile}
                className=' h-full p-2 bg-gray-50/75'>
                {sendingMessages ?
                    <Loader /> :
                    <PaperAirplaneIcon width={30} className={`text-gray-400
                ${(value.trim() === '' && !uploadedFile) ? "hover:cursor-not-allowed" : "hover:text-gray-600"} `} onClick={handleSubmit} />}
            </button>
        </div>
    )
}