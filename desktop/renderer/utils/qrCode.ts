import axios from "axios";

var params = {
    "token": "9fn5lnoeg7fszr1i"
};


let config = {
    method: 'get',
    url: 'https://api.ultramsg.com/instance53164/instance/qrCode',
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
        throw new Error("Error getting QR code");
    }
}