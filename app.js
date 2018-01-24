// Require modules.
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
// Sets response headers.
const helmet = require('helmet');
// Content Security Policy.
const csp = require('helmet-csp');
/* const logger = require('morgan'); */
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
app.use(favicon(path.join(__dirname, 'favicon.ico'), {
  maxAge: 2592000000
}));

// Set some security headers with the Helmet package.
app.use(helmet());
// Content Security Policy added, inline scripts disabled (with 3 exeptions)
app.use(csp({
  directives: {
    defaultSrc: [`'self'`],
    styleSrc: [`'self'`, 'https://fonts.googleapis.com', 'https://www.youtube-nocookie.com', 'https://www.youtube.com'],
    fontSrc: [`'self'`, 'https://fonts.gstatic.com/'],
    scriptSrc: [`'self'`, 'https://www.youtube-nocookie.com', 'https://www.youtube.com', 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
    childSrc: [`'self'`, 'https://www.youtube-nocookie.com', 'https://www.youtube.com'],
    imgSrc: [`'self'`, 'www.google-analytics.com'],
    objectSrc: [`'self'`],
    connectSrc: [`'self'`]
  }
}));

/* app.use(logger('dev')); */

app.use(bodyParser.json());

// To serve static files.
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 2592000000
}));

// Require utils.js
const utils = require('./routes/utils');

// an HTTP GET method for the homepage.
app.get('/', utils.home);

// an HTTP GET method for the archive.
app.get('/archivum', utils.archive);

// an HTTP GET method for a single blogpost.
app.get('/cikk/:id', utils.singlePost);

// an HTTP GET method for the 'Recognize the music style' game.
app.get('/app/:id', utils.singleApp);

// an HTTP GET method for the error page if url is bad.
app.get('*', utils.notFound);

// Start the server.
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
