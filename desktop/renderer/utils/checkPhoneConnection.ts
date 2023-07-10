import axios from "axios";

var params = {
    "token": "9fn5lnoeg7fszr1i"
};

var config = {
    method: 'get',
    url: 'https://api.ultramsg.com/instance53164/instance/me',
    headers: {
        'Content-Type': 'application/json'
    },
    params: params
};

export const checkPhoneConnection = async () => {
    try {
        const response = await axios(config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}