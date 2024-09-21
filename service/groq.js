const { config } = require('../conf/groq');
const Groq = require('groq-sdk');

const client = new Groq({
  apiKey: config.key,
});

async function generate(prompt) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-8b-8192',
  });

  return chatCompletion.choices[0].message.content;
}

module.exports = { generate };