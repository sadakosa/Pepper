const express = require('express');
const router = express.Router();

const { telegram } = require('../service/telegram')

// ROUTES
router.get('/initialize', async (req, res) => {
    try {
        const { host, url } = req.params;
        if (!host && !url) return res.status(401).send("Invalid request.")

        const webhook = url || `${host}/telegram/webhook`;
        await telegram.initialize(webhook);

        res.send(`Initialized: ${webhook}`)

    } catch (err){
        console.log(err)
        res.status(500).send("Server error.")
    }
})

router.post('/webhook', async (req, res) => {
    try {
        //log req headers
        console.log(req.header)

        //log req body
        console.log(req.body)
        res.send('ok');
    } catch (err){
        console.log(err)
        res.status(500).send("Server error.")
    }
});

module.exports = router;