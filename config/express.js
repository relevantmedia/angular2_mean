'use strict';

/**
 * Module dependencies.
 */
var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	consolidate = require('consolidate'),
	path = require('path');

/**
 * Initialize the Express application
 */
module.exports.init = function () {
	// Initialize express app
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './');
	app.use('/', express.static(path.resolve('./')));

	require('../modules/core/server/routes/core.server.routes.js')(app);
	
	return app;
};
