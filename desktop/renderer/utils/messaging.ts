import axios from 'axios';
import { toast } from 'react-hot-toast';


const generateUrl = (body: {
    body?: string,
    audio?: string,
    image?: string,
    video?: string,
    caption?: string
}): string => {
    let url = `https://api.ultramsg.com/instance53164/messages`;
    if (body.body) {
        url += "/chat";
    } else if (body.audio) {
        url += "/audio";
    } else if (body.image) {
        url += "/image";
    } else if (body.video) {
        url += "/video";
    }
    return url;
}
export const sendMessage = async (phoneNumber: string, content: {
    body?: string,
    audio?: string,
    image?: string,
    video?: string,
    caption?: string
}) => {

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