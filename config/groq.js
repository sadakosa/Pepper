require('dotenv').config();
const { warn } = require('../lib/common');

const config = {
  model: process.env.GROQ_MODEL || 'llama3-8b-8192',
  key: process.env.GROQ_API_KEY || warn('GROQ_API_KEY not set'),
}

module.exports = { config };