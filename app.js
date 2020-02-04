// modules required
const express = require('express');
const shortener = require('./api/shortener');
const bodyParser = require('body-parser');

// create app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.use('/api/shorten', shortener);

// export module
module.exports = app;