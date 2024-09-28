const { config } = require('../config/groq');
const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');

const client = new Groq({
  apiKey: config.key,
});

const groq = {
  generate: async (prompt) => {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
    });
    return chatCompletion.choices[0].message.content;
  },

  updateMemory: async (chat, text) => {
    const { id, first_name, username } = chat;
    const memoryFile = path.join(__dirname, `../data/${id}.txt`);
    fs.appendFileSync(memoryFile, `${first_name} (${username}): ${text}\n`);
  },

  clearMemory: async (chatId) => {
    const memoryFile = path.join(__dirname, `../data/${chatId}.txt`);
    fs.writeFileSync(memoryFile, '');
    console.log('Memory cleared.');
  },
  
  respondFromMemory: async (chat, text) => {
    const { id: chatId } = chat;
    const memoryFile = path.join(__dirname, `../data/${chatId}.txt`);

    if (!fs.existsSync(memoryFile)) return null;

    const memory = fs.readFileSync(memoryFile, 'utf8');
    const lines = memory.split('\n');
    const lastMessage = lines[lines.length - 2];

    const [name, message] = lastMessage.split(':');
    if (!name || !message) return null;

    return message;
  }
};

module.exports = groq;