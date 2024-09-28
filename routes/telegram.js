const express = require('express');
const router = express.Router();

const { telegram } = require('../services/telegram')
const messages = require('../controllers/messages');

// ROUTES
router.get('/initialize', async (req, res) => {
    try {
        const { host, url } = req.query;
        if (!host && !url) return res.status(401).send("Invalid request.")

        const webhook = url || `${host}/telegram/webhook`;
        console.log(webhook)
        await telegram.initialize(webhook);

        res.send(`Initialized: ${webhook}`)
    } catch (err){
        console.log(err)
        res.status(500).send("Server error.")
    }
})

router.post('/webhook', async (req, res) => {
    try {
        await messages.handler(req.body);
        res.send('ok');
    } catch (err){
        console.log(err)
        res.status(500).send("Server error.")
    }
});

module.exports = router;