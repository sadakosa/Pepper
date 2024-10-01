# READ ME

To run bot:
``npm install``

populate .env file with 
    GROQ_API_KEY & TELEGRAM_TOKEN

To get telegram bot token, open telegram, find the botfather
create a new bot and you will be provided a token.

run ``node server.js``

To modify bot behavior
edit file ``/controllers/messages.js``


Ps: I know you're not very keen on working on a scheduling bot now. Its ok.
I just want to leave the project with a complete feature, and also a
template for you to build future apps with.

The telebot interfaces with an LLM now.
Easily launched from a single entry point, server.js
You may use this to do whatever you want from here on.

I'm going to work on my own thing now.

# Pepper

## `What is Pepper? 

Pepper is a personal assistant. She is meant to be able to cover 3 main use cases but we are only focusing on the first one for now: 
1. Scheduling 
2. Purchasing / Event Management / etc.
3. Liaising with Clients

## Scheduling 
1. Pepper is able to
    1. Understand the rhythms of the person she is assisting (e.g., what times they are ok with working and scheduling meetings, what kinds of meetings they prefer to have when) 
    2. Take instructions like schedule this guy for next week or every month and liaise with the guy directly to schedule that
        1. Connection to gmail, WhatsApp, tele, etc. required
    3. [Bonus points] Understand when something is urgent and know when to break the rules

## What we need to do to produce the scheduler
1. Have an Ollama/LLM model running
2. Connect to Google Calendar, Whatsapp, Tele, Gmail, etc. 
2a. Know the preferences of the bosses
3. Have a text interface 
4. Have a speech based interface 


https://www.npmjs.com/package/groq-sdk



## MVP
1. Scheduling with a particular person
- I want to schedule a meeting with Jack for next week -> Pepper goes and finds the times that makes sense based on free time slots and preferences, and suggests those in a message template
- Upon receiving the response, parse the response and schedule it into the calendar and invite the person too 







# NPM 
'''
npm i dotenv 
'''