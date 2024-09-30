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
    const { id, first_name } = chat;
    const memoryFile = path.join(__dirname, `../data/${id}.dat`);
    if (!fs.existsSync(memoryFile)) {
      fs.writeFileSync(memoryFile, '');
    }
    fs.appendFileSync(memoryFile, `${first_name}: ${text}\n`);
  },

  clearMemory: async (chatId) => {
    const memoryFile = path.join(__dirname, `../data/${chatId}.dat`);
    fs.writeFileSync(memoryFile, '');
    console.log('Memory cleared.');
  },

  setSystemPrompt : async (prompt) => {
    const storedPrompt = path.join(__dirname, `../data/system.txt`);
    fs.writeFileSync(storedPrompt, prompt);
    console.log('System prompt updated.');
  },

  respondFromMemory: async (chat) => {
    const { id } = chat;

    const memory = getMemory(id);
    const systemPrompt = getSystemPrompt();

    console.log('System Prompt:', systemPrompt);
    
    const groqResponse = await client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: memory }
      ],
      model: 'llama3-8b-8192',
    });

    // If Groq has a response, update memory
    const response = groqResponse.choices[0].message.content;
    const memoryFile = path.join(__dirname, `../data/${id}.dat`);
    fs.appendFileSync(memoryFile, `${response}\n`);
    return response;
  }
};

function getMemory(id) {
  const memoryFile = path.join(__dirname, `../data/${id}.dat`);
  let memory = fs.readFileSync(memoryFile, 'utf8');
  return memory || '';
}

function getSystemPrompt() {
  const storedPrompt = path.join(__dirname, `../data/system.txt`);
  if (!fs.existsSync(storedPrompt)) {
    return 'Your name is Aristotle, you are the other party in this conversation, response length should be no longer that one or two sentences.';
  }
  return fs.readFileSync(storedPrompt, 'utf8');
};

module.exports = groq;