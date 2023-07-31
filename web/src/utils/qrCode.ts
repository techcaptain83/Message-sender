import axios from "axios";

var params = {
    "token": "pwj223o41dntp1z8"
};


let config = {
    method: 'get',
    url: 'https://api.ultramsg.com/instance56307/instance/qrCode',
    headers: {
        'Content-Type': 'application/json'
    },
    params: params
};

export const getQRCode = async () => {
    try {
        const response = await axios(config);
        // console.log(response)
        return response.data;
    } catch {
        console.log("error getting qr code");
        return null;
    }
}