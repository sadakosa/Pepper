const express = require('express');
const app = express();

// setup middleware
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const morgan = require('morgan');
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World, this works.'); F
});

app.use('/telegram', require('./routes/telegram'))

//404 Precessing
app.use('*', (req, res) => {
    res.status(404).json(
        {
            code: 404, 
            message: 'Error 404 not found'
        }
    );
});
  
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});