// modules required
const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');
const Uri = require('../Schemas/uri');

// creates router
const router = express.Router();

// POST request
router.post('/', (req, res) => {

    // check if uri is valid
    const uriIsValid = validUrl.isWebUri(req.body.uri);

    if(uriIsValid) {

        // check if the original URI has alreay has a shortened URI 
        Uri.findOne({originalUri: req.body.uri}).then((data) => {
            res.json({
                status: 201,
                message: 'URI already shortened',
                shortUri: data.shortUri
            })
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
                    shortUri: dataSaved.shortUri
                })
            }).catch((err) => {
                res.json({
                    status: 202,
                    message: 'Error Occured'
                })
            });
        });
    } else {
        res.json({
            status: 203,
            message: 'Invalid URI'
        })
    }
    
});

// module export
module.exports = router;