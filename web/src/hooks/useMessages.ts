import { selectedFileState } from '@/atoms';
import { ILogContact, IUser } from '@/types';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import useLogs from './useLogs';
import useWhatsappAPI from './useWhatsappApi';

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
    const { sendMessage } = useWhatsappAPI();

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