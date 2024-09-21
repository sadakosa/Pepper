// connect to Groq API to send prompts and receive responses
require('dotenv').config();
const Groq = require('groq-sdk');

const client = new Groq({
  apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Explain the importance of low latency LLMs' }],
    model: 'llama3-8b-8192',
  });

  console.log(chatCompletion.choices[0].message.content);
}


main();




// import Groq from 'groq-sdk';

// const client = new Groq({
//   apiKey: process.env['GROQ_API_KEY'], // This is the default and can be omitted
// });

// async function main() {
//   const params: Groq.Chat.CompletionCreateParams = {
//     messages: [
//       { role: 'system', content: 'You are a helpful assistant.' },
//       { role: 'user', content: 'Explain the importance of low latency LLMs' },
//     ],
//     model: 'llama3-8b-8192',
//   };
//   const chatCompletion: Groq.Chat.ChatCompletion = await client.chat.completions.create(params);
// }

// main();

