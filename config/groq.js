require('dotenv').config();
const { warn, abort } = require('../utils/common');

const config = {
  model: process.env.GROQ_MODEL || 'llama3-8b-8192',
  key: process.env.GROQ_API_KEY || abort('GROQ_API_KEY not set'),
}

module.exports = { config };