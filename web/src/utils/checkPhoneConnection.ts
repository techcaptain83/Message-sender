import axios from "axios";

var params = {
    "token": "pwj223o41dntp1z8"
};

var config = {
    method: 'get',
    url: 'https://api.ultramsg.com/instance56307/instance/me',
    headers: {
        'Content-Type': 'application/json'
    },
    params: params
};

export const checkPhoneConnection = async () => {
    try {
        const response = await axios(config);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}