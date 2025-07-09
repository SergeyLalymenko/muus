import axios from 'axios';

const apiCoingecko = axios.create({
    baseURL: `https://api.coingecko.com/api/v3`,
    validateStatus: (status: number): boolean => {
        return status >= 200 && status < 300;
    },
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
    },
});

export default apiCoingecko;
