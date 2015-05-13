'use strict';

/**
 * Module dependencies.
 */
var config = require('./config/config'),
	express = require('./config/express');

var app = express.init();

// Start the app by listening on <port>
app.listen(config.port);

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);