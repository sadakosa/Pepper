const telegram = require('../services/telegram');
const groq = require('../services/groq');

const messages = {
    handler: async (message) => {
        try {
            console.log('Telegram Message:', message)

            // Command routing
            if (message.text.startsWith('/')) {
                await handleCommand(message);
                return;
            }
            
            // Message to Groq
            if (!message.from.is_bot) {
                const { chat, text } = message;
                groq.updateMemory(chat, text);

                const response = await groq.respondFromMemory(chat, text);
                if (response) {
                    console.log("GroqMessage:", response)
                    await telegram.sendMessage(chat.id, response);
                }
            }
        } catch (err){
            console.log(err)
            res.status(500).send("Server error.")
        }
    }
}

async function handleCommand(message) {
    // Handle commands
    const command = message.text.split(' ')[0];
    switch (command) {
        case '/clearMemory':
            groq.clearMemory(message.chat.id);
            break;
        default:
            await telegram.sendMessage(message.chat.id, 'Invalid command.');
            break;
    }
}

module.exports = messages;