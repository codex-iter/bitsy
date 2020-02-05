// modules required
const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');
const Uri = require('../Schemas/uri');

// creates router
const router = express.Router();

// GET request for redirecting to original URI
router.get('/:shorturi', (req, res) => {

    // check if shortened URI is registered 
    Uri.findOne({shortUri: req.params.shorturi}).then((data) => {
        res.redirect(data.originalUri);
    }).catch((err) => {
        // if not registered, rediret to 404 page
        res.redirect("https://www.google.com");
    })
});

// GET request for returning all urls
router.get('/uri/all', (req, res) => {
    Uri.find({}).then((data) => {
        res.json(data.map(uri => {
                return {
                    _id: uri._id,
                    createdAt: uri.createdAt,
                    originalUri: uri.originalUri,
                    shortUri: process.env.BASE_DOMAIN + uri.shortUri
                }
        }));
    });
});

// POST request for URI shortening
router.post('/new', (req, res) => {

    // check if uri is valid
    const uriIsValid = validUrl.isWebUri(req.body.uri);

    if(uriIsValid) {

        // check if the original URI has alreay has a shortened URI 
        Uri.findOne({originalUri: req.body.uri}).then((data) => {
            res.json({
                status: 201,
                message: 'URI already shortened',
                shortUri: process.env.BASE_DOMAIN + data.shortUri
            });
        }).catch((err) => {

            // generate shortened URI
            const newUri = new Uri({
                createdAt: new Date(),
                originalUri: req.body.uri,
                shortUri: shortId.generate()
            });

            // save generated short URI
            newUri.save().then((dataSaved) => {
                res.json({
                    status: 200,
                    originalUri: dataSaved.originalUri,
                    shortUri: process.env.BASE_DOMAIN + dataSaved.shortUri
                });
            }).catch((err) => {
                res.json({
                    status: 202,
                    message: 'Error Occured'
                });
            });
        });
    } else {
        res.json({
            status: 203,
            message: 'Invalid URI'
        });
    }
});

// module export
module.exports = router;