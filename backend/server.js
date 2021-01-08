const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connection to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => res.send('helloooggg'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server is running...'));