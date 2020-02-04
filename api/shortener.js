// modules required
const express = require('express');

// creates router
const router = express.Router();

// GET request
router.get('/', (req, res) => {
    res.json({works: true});
});

// module export
module.exports = router;