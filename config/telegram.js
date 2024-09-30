require('dotenv').config();
const { warn, abort } = require('../utils/common');

const config = {
    telegramToken: process.env.TELEGRAM_TOKEN || abort('TELEGRAM_TOKEN not set'),
    // telegramWebhookURL: process.env.TELEGRAM_WEBHOOK_URL || warn('TELEGRAM_WEBHOOK_URL not set'),
}

module.exports = { config };