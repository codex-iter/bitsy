// modules required
const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../loginCheck');

// create a router
const router = express.Router();

// POST request for logging in
router.post('/login', passport.authenticate('login'), (req, res) => {
    res.json({
        status: 200,
        message: 'Logged In Succesfully'
    });
});

// POST request for logging out
router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.json({
        status: 200,
        message: 'Logged Out Successfully'
    });
});

// module export
module.exports = router;