require('dotenv').config();
const { warn } = require('../utils/common');

const config = {
    telegramToken: process.env.TELEGRAM_TOKEN || warn('TELEGRAM_API_KEY not set'),
    // telegramWebhookURL: process.env.TELEGRAM_WEBHOOK_URL || warn('TELEGRAM_WEBHOOK_URL not set'),
}

module.exports = { config };