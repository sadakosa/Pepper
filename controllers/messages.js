const telegram = require('../services/telegram');
const groq = require('../services/groq');

const messages = {
    handler: async (body) => {
        try {
            const { message } = body;
            console.log('TeleMessage:', message)
            if (!message.from.is_bot) {
                const { chat, text } = body.message;
                const response = await groq.generate(text);
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

module.exports = messages;