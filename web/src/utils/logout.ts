import axios from "axios";

let data = JSON.stringify({
    "token": "pwj223o41dntp1z8"
});

let config = {
    method: 'post',
    url: 'https://api.ultramsg.com/instance56307/instance/logout',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

export const whatsappLogout = async () => {
    try {
        const response = await axios(config);
        return response.data;
    } catch {
        return {}
    }
}