// modules required
const express = require('express');
const session = require('express-session');
const shortener = require('./api/shortener');
const login = require('./api/login');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// create app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: "cat keyword",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// mongoDB Connection
mongoose.connect(process.env.BITSY_URI, {useNewUrlParser: true, useUnifiedTopology: true});

require('./authenticate')(passport);

// routes
app.use('/', shortener);
app.use('/user', login);

// export module
module.exports = app;