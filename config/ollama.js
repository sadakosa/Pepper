require('dotenv').config();

const config = {
  model: process.env.OLLAMA_MODEL || 'phi3',
  stream: false,
  host: process.env.OLLAMA_HOST || 'http://127.0.0.1:11434'
}

module.exports = { config };