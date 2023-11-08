import { selectedFileState } from '@/atoms';
import { sendingMessagesAtom } from '@/store/atoms';
import { ILogContact, IUser } from '@/types';
import { useRecoilState, useRecoilValue } from 'recoil';
import useLogs from './useLogs';
import useWhatsappAPI from './useWhatsappApi';

interface IContent {
    body?: string,
    audio?: string,
    image?: string,
    video?: string,
    caption?: string
}

export default function useMessages() {

    const [_, setSendingMessages] = useRecoilState(sendingMessagesAtom);
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
                const data = await sendMessage(`${contact.countryCode}${contact.phoneNumber}`.trim(), {
                    displayName: contact.displayName,
                    displayText: contact.displayText,
                    ...content
                });



                if (data?.message === "ok") {
                    sentCount++;

                    logContacts.push({
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        phoneNumber: `(${contact.countryCode}) ${contact.phoneNumber}`,
                        sent: true,
                    });
                    if (index === contacts.length - 1) {
                        setSendingMessages(false);
                        await createLog({
                            filename: selectedFile!.filename,
                            sentCount,
                            failedCount,
                            contacts: logContacts,
                        });
                    }
                } else {
                    failedCount++;
                    logContacts.push({
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        phoneNumber: `(${contact.countryCode}) ${contact.phoneNumber}`,
                        sent: false,
                    });
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

            } catch (error) {
                failedCount++;
                logContacts.push({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phoneNumber: `(${contact.countryCode}) ${contact.phoneNumber}`,
                    sent: false,
                });
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
    }
}