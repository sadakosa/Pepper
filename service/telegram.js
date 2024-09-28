const axios = require('axios');
const { config } = require('../config/telegram');

const BASE_URL = `https://api.telegram.org/bot${config.telegramToken}`;

function getAxiosInstance() {
    return {
        get(method, params) {
            return axios.get(`/${method}`,
                {
                    baseURL: BASE_URL,
                    params
                });
        },
        post(method, data) {
            return axios({
                    baseURL: BASE_URL,
                    url: `/${method}`,
                    method: 'POST',
                    data
                });
        }
    }
}

module.exports = { axiosInstance: getAxiosInstance() };