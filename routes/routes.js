const express = require('express');
const router = express.Router();

// Require utils.js
const utils = require('./utils');

// an HTTP GET method for the homepage
router.get('/', utils.home);

// an HTTP GET method for a single blogpost
router.get('/cikk/:id?', utils.singlePost);

// an HTTP GET method for the 'Recognize the music style' game.
router.get('/app/:id', utils.singleApp);

// an HTTP GET method for the error page if url is bad
router.get('*', utils.notFound);

// Export the router object (with the above HTTP methods) to use it in app.js
module.exports = router;
