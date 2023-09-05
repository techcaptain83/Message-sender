import useAuth from "./useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

interface ApiInstance {
    instanceId: string;
    token: string;
}

interface IContent {
    displayName?: string,
    body?: string,
    audio?: string,
    image?: string,
    video?: string,
    caption?: string
}

const defaultApiInstance = {
    instanceId: "instance56307",
    token: "pwj223o41dntp1z8"
}
const baseUrl = "https://api.ultramsg.com/"
export default function useWhatsappAPI() {
    const { user } = useAuth();
    const [apiInstance, setApiInstance] = useState<ApiInstance | null>(user?.api || null);


    useEffect(() => {
        if (!user) {
            setApiInstance(null);
        }
        else if (user.api) {
            setApiInstance(user.api);
        } else {
            setApiInstance(defaultApiInstance)
        }
    }, [user]);

    const logout = async () => {
        let data = JSON.stringify({
            "token": apiInstance?.token
        });

        let config = {
            method: 'post',
            url: `${baseUrl + apiInstance?.instanceId}/instance/logout`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const getQRCode = async () => {
        let params = {
            "token": apiInstance?.token
        };

        let config = {
            method: 'get',
            url: `${baseUrl + apiInstance?.instanceId}/instance/qrCode`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: params
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const checkPhoneConnection = async () => {
        let params = {
            "token": apiInstance?.token
        };

        let config = {
            method: 'get',
            url: `${baseUrl + apiInstance?.instanceId}/instance/me`,
            headers: {
                'Content-Type': 'application/json'
            },
            params: params
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const generateUrl = (body: {
        body?: string,
        audio?: string,
        image?: string,
        video?: string,
        caption?: string
    }) => {
        let url = `${baseUrl + apiInstance?.instanceId}/messages`;
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

    const sendMessage = async (phoneNumber: string, content: IContent) => {
        let data: any = {
            "token": apiInstance?.token,
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

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }


    return {
        logout,
        getQRCode,
        checkPhoneConnection,
        generateUrl,
        sendMessage
    }
}