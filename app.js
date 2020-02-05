// modules required
const express = require('express');
const shortener = require('./api/shortener');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// mongoDB Connection
mongoose.connect(process.env.BITSY_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// routes
app.use('/api/shortener/new', shortener);

// export module
module.exports = app;