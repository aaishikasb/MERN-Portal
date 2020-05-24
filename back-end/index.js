// Importing Modules

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookie = require('cookie-parser');

// Middleware

app.use(cors({origin: 'http://localhost:3000', credentials: true }));
app.use(cookie());
app.use(express.json());

// Connect to DB and Start Server

mongoose.connect('mongodb://localhost:27017/auth-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, (err) => {
        if (err) return console.error('connection failed');

        app.listen(4000, () => {
            console.log('running on: 4000');

        });
    });

// Routes

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/valid', require('./routes/valid'));