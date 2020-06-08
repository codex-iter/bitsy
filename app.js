// modules required
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const shortener = require('./api/shortener');
const login = require('./api/login');

// create app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: process.env.BASE_ADMIN.toString()}));
const corsMiddleware = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.BASE_ADMIN.toString());
    res.header('Access-Control-Allow-Origin', process.env.BASE_ADMIN.toString());
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');

    next();
};
app.use(corsMiddleware);
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