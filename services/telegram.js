const axios = require('axios');
const { config } = require('../config/telegram');

const BASE_URL = `https://api.telegram.org/bot${config.telegramToken}`;

module.exports = {
    telegram: {
        async initialize(webhook) {
            try {
                const url = `${BASE_URL}/setWebhook?url=${webhook}`;
                const response = await axios.get(url);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    sendMessage: async (chatId, message) => {
        try {
            const url = `${BASE_URL}/sendMessage`;
            const response = await axios.post(url, {
                chat_id: chatId,
                text: message
            });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    },
    forwardMessage: async (chatId, fromChatId, messageId) => {
        try {
            const url = `${BASE_URL}/forwardMessage?chat_id=${chatId}&from_chat_id=${fromChatId}&message_id=${messageId}`;
            const response = await axios.get(url);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    },
    getChatId: async (chatId) => {
        try {
            const url = `${BASE_URL}/getChat?chat_id=${chatId}`;
            const response = await axios.get(url);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    },
    getChatMembersCount: async (chatId) => {
        try {
            const url = `${BASE_URL}/getChatMembersCount?chat_id=${chatId}`;
            const response = await axios.get(url);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    },
    getChatMember: async (chatId, userId) => {
        try {
            const url = `${BASE_URL}/getChatMember?chat_id=${chatId}&user_id=${userId}`;
            const response = await axios.get(url);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    },
    getChatAdministrators: async (chatId) => {
        try {
            const url = `${BASE_URL}/getChatAdministrators?chat_id=${chatId}`;
            const response = await axios.get(url);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    },
}