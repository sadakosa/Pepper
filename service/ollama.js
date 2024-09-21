const axios = require('axios');
const { config } = require('../conf/ollama');

const ollama = {
  generateSync : async (prompt) => {
  const response = await axios.post(config.host, {
    model: config.model,
    stream: config.stream,
    prompt,
  });
  return response.data;
}}

module.exports = ollama;