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
    const { id } = chat;
    const memoryFile = path.join(__dirname, `../data/${id}.txt`);

    let memory = '';
    if (fs.existsSync(memoryFile)) {
      memory = fs.readFileSync(memoryFile, 'utf8');
    }
    console.log('Memory:', memory);

    const groqResponse = await client.chat.completions.create({
      messages: [
        { role: 'system', 
          content: 'You are the responding as Groq in this conversation, this is a text only chat. your response should be as short as possible' },
        { role: 'user', content: memory }
      ],
      model: 'llama3-8b-8192',
    });

    // If Groq has a response, update memory
    fs.appendFileSync(memoryFile, `Groq: ${groqResponse.choices[0].message.content}\n`);
    return groqResponse.choices[0].message.content;
  }
};

module.exports = groq;