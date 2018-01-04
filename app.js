// Require modules.
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const helmet = require('helmet');
/*const logger = require('morgan');*/
const bodyParser = require('body-parser');

// Set port number.
const port = process.env.PORT || 4000;

// Create an express server.
const app = express();

// App configurations.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares.
// GET /favicon.ico.
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Set some security headers with the Helmet package.
app.use(helmet());

/*app.use(logger('dev'));*/

app.use(bodyParser.json());

// To serve static files.
app.use(express.static(path.join(__dirname, 'public')));


// Require utils.js
const utils = require('./routes/utils');

// an HTTP GET method for the homepage.
app.get('/', utils.home);

// an HTTP GET method for a single blogpost.
app.get('/cikk/:id', utils.singlePost);

// an HTTP GET method for the error page if url is bad.
app.get('*', utils.notFound);


// Start the server.
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});