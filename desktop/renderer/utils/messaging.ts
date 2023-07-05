import axios from 'axios';
import { toast } from 'react-hot-toast';

export const sendMessage = async (message: string, phoneNumber: string) => {
    let data = JSON.stringify({
        "token": "9fn5lnoeg7fszr1i",
        "to": phoneNumber,
        "body": message
    });

    let config = {
        method: 'post',
        url: 'https://api.ultramsg.com/instance53164/messages/chat',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then((response) => {
            if (response.data.message === "ok") {
                toast.success("Message sent successfully to number : " + phoneNumber);
            }
        })
        .catch((error) => {
            toast.error("Error occured while sending message! to number : " + phoneNumber);
            console.log(error);
        });
}