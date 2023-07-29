import axios from "axios";

let data = JSON.stringify({
    "token": "9fn5lnoeg7fszr1i"
});

let config = {
    method: 'post',
    url: 'https://api.ultramsg.com/instance53164/instance/logout',
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