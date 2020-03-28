// modules required
const express = require('express');
const validUrl = require('valid-url');
const shortId = require('shortid');
const passport = require('passport');
const Uri = require('../Schemas/uri');
const isLoggedIn = require('../loginCheck');

// creates router
const router = express.Router();

// GET request for redirecting to original URI
router.get('/:shorturi', (req, res) => {

    // check if shortened URI is registered 
    Uri.findOne({shortUri: req.params.shorturi}).then((data) => {
        res.redirect(data.originalUri);
    }).catch((err) => {
        // if not registered, rediret to 404 page
        res.json({
            status: 404,
            message: 'Not Found'
        });
    });
});

// GET request for returning all urls
router.get('/uri/all', isLoggedIn, (req, res) => {

    // all URI that has been shotened/registered
    Uri.find({}).then((dataList) => {
        
        if(dataList.length == 0) { // if no URI has been shotened/registered
            res.json({
                status: 201,
                message: 'No URI regisitred'
            });
        } else {
            res.json({
                status: 200,
                message: 'All URI list',
                data: dataList.map(uri => {
                    return {
                        _id: uri._id,
                        createdAt: uri.createdAt,
                        originalUri: uri.originalUri,
                        shortUri: process.env.BASE_DOMAIN + uri.shortUri
                    }
                })
            });
        }
    }).catch((err) => {
        res.json({
            status: 202,
            message: 'Error Occured'
        });
    });
});

// POST request for URI shortening
router.post('/new', isLoggedIn, (req, res) => {

    if (!(req.body.uri)) {
        res.json({
            status: 205,
            message: 'Necessary Parameters Missing'
        });
    }

    // check if uri is valid
    const uriIsValid = validUrl.isWebUri(req.body.uri);

    if(uriIsValid) {

        // check if the original URI has alreay has a shortened URI 
        Uri.findOne({originalUri: req.body.uri}).then((data) => {
            res.json({
                status: 201,
                message: 'URI already shortened',
                originalUri: data.originalUri,
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
                    message: 'URI Registered Successfully',
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

// POST request for deleting shortened URI
router.post('/delete', isLoggedIn, (req, res) => {

    if (!(req.body._id && req.body.shortUri)) {
        res.json({
            status: 205,
            message: 'Necessary Parameters Missing'
        });
    }

    // delete using the _id and shortUri
    Uri.deleteOne({_id: req.body._id, shortUri: req.body.shortUri}).then((data) => {

        if (data.deletedCount === 0) {          // when data is not found
            res.json({
                status: 201,
                message: 'URI not found'
            });
        } else {                                // when data is deleted successfully 
            res.json({
                status: 200,
                message: 'Deleted Successfully'
            });
        }
    }).catch((err) => {
        res.json({
            status: 202,
            message: 'Error Occured'
        });
    });
})

// module export
module.exports = router;