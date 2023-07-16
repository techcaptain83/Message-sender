import { logToSaveState, selectedFileState } from '@/atoms';
import { IUser } from '@/types';
import { generateUrl } from '@/utils/messaging';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import useLogs from './useLogs';

interface IContent {
    body?: string,
    audio?: string,
    image?: string,
    video?: string,
    caption?: string
}

export default function useMessages() {

    const [sendingMessages, setSendingMessages] = useState(false);
    const [logTosave, setLogToSave] = useRecoilState(logToSaveState);
    const selectedFile = useRecoilValue(selectedFileState);
    const { createLog } = useLogs();


    const sendMessage = async (phoneNumber: string, content: IContent) => {

        let data: any = {
            "token": "9fn5lnoeg7fszr1i",
            "to": phoneNumber
        };

        if (content.body) {
            data.body = content.body;
        }

        if (content.audio) {
            data.audio = content.audio;
        }

        if (content.image) {
            data.image = content.image;
        }

        if (content.video) {
            data.video = content.video;
        }
        if (content.caption) {
            data.caption = content.caption
        }

        let requestData = JSON.stringify(data);

        let config = {
            method: 'post',
            url: generateUrl(content),
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestData
        };

        return axios(config)
    }


    const sendBulkMessages = async (contacts: IUser[], content: IContent) => {
        setSendingMessages(true);

        let sentCount = 0;
        let failedCount = 0;
        setLogToSave({
            filename: selectedFile.filename,
            contacts: [],
            sentCount: 0,
            failedCount: 0,
        })
        contacts.map((contact) => {
            sendMessage(`${contact.countryCode}${contact.phoneNumber}`.trim(), content).then((response) => {
                if (response.data.message === "ok") {
                    toast.success("Message sent successfully to number : " + contact.phoneNumber);
                    sentCount++;
                    setLogToSave({
                        ...logTosave,
                        contacts: [
                            ...logTosave.contacts,
                            {
                                firstName: contact.firstName,
                                lastName: contact.lastName,
                                phoneNumber: contact.phoneNumber,
                                sent: true,
                            }
                        ],
                        sentCount: sentCount,
                    })
                } else {
                    toast.error("failed to send message to number : " + contact.phoneNumber);
                    failedCount++;
                    setLogToSave({
                        ...logTosave,
                        contacts: [
                            ...logTosave.contacts,
                            {
                                firstName: contact.firstName,
                                lastName: contact.lastName,
                                phoneNumber: contact.phoneNumber,
                                sent: false,
                            }
                        ],
                        failedCount: failedCount,
                    });
                }
            })
        });
        setSendingMessages(false);
        createLog();
    }


    return {
        sendMessage,
        sendBulkMessages,
        sendingMessages,
    }
}