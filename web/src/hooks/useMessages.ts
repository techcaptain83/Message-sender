import { selectedFileState } from '@/atoms';
import { ILogContact, IUser } from '@/types';
import { generateUrl } from '@/utils/messaging';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import useLogs from './useLogs';

interface IContent {
    displayName?: string,
    body?: string,
    audio?: string,
    image?: string,
    video?: string,
    caption?: string
}

export default function useMessages() {

    const [sendingMessages, setSendingMessages] = useState(false);
    const selectedFile = useRecoilValue(selectedFileState);
    const { createLog } = useLogs();

    const sendMessage = async (phoneNumber: string, content: IContent) => {

        let data: any = {
            "token": "pwj223o41dntp1z8",
            "to": phoneNumber
        };

        if (content.body) {
            data.body = content.body.replace(/\[name\]/g, content.displayName || "");
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
            data.caption = content.caption.replace(/\[name\]/g, content.displayName || "");
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
        let logContacts: ILogContact[] = [];


        for (let index = 0; index < contacts.length; index++) {
            const contact = contacts[index];
            // check if there is a phone number in logContacts matching the current contact
            // if so, skip sending message to that number
            if (logContacts.find((logContact) => logContact.phoneNumber === `(${contact.countryCode}) ${contact.phoneNumber}`)) {
                continue;
            }
            try {
                const { data } = await sendMessage(`${contact.countryCode}${contact.phoneNumber}`.trim(), {
                    displayName: contact.displayName, ...content
                });
                if (data.message === "ok") {
                    toast.success("Message sent successfully to number : " + contact.phoneNumber);
                    sentCount++;

                    logContacts.push({
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        phoneNumber: `(${contact.countryCode}) ${contact.phoneNumber}`,
                        sent: true,
                    });
                } else {
                    toast.error("failed to send message to number : " + contact.phoneNumber);
                    failedCount++;
                    logContacts.push({
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        phoneNumber: `(${contact.countryCode}) ${contact.phoneNumber}`,
                        sent: false,
                    });
                }
            } catch (error) {
                toast.error("failed to send message to number : " + contact.phoneNumber);
                failedCount++;
                logContacts.push({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phoneNumber: `(${contact.countryCode}) ${contact.phoneNumber}`,
                    sent: false,
                });
            } finally {
                if (index === contacts.length - 1) {
                    setSendingMessages(false);
                    await createLog({
                        filename: selectedFile!.filename,
                        sentCount,
                        failedCount,
                        contacts: logContacts,
                    });
                }
            }
        }
    }

    return {
        sendMessage,
        sendBulkMessages,
        sendingMessages,
    }
}