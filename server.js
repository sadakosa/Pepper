const express = require('express');
const app = express();

const { config } = require('./config/server');

app.get('/', (req, res) => {
    res.send('Hello World'); F
});

app.get('/initialize', (req, res) => {
    res.send('Initialize');
}); 

app.post('/', (req, res) => {
    // console log headers
    console.log(req.headers);
    // console log body
    console.log(req.body);
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});