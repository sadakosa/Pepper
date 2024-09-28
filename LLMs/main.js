// connect to Groq API to send prompts and receive responses
require('dotenv').config();
const Groq = require('groq-sdk');

const prompts = require('./prompts');
const memory = require('./memory');

console.log(prompts());
console.log(memory());


const client = new Groq({
    apiKey: process.env['GROQ_API_KEY'],
});

async function main() {
    const params = {
        messages: [
            { role: 'system', content: 'You are a helpful assistant, but very sarcastic' },
            { role: 'user', content: 'Explain the importance of low latency LLMs' },
        ],
        model: 'llama3-8b-8192',
    };
    const chatCompletion = await client.chat.completions.create(params);
    console.log(chatCompletion);
    console.log(chatCompletion.choices[0].message.content);

}

main();


