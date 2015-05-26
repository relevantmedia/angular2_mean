'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	consolidate = require('consolidate'),
	favicon = require('serve-favicon'),
	path = require('path');

/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {
	// Showing stack errors
	app.set('showStackError', true);

	// Enable jsonp
	app.enable('jsonp callback');

	// Initialize favicon middleware
	app.use(favicon('./modules/core/client/img/brand/favicon.ico'));

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
};

/**
 * Configure view engine
 */
module.exports.initViewEngine = function (app) {
	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './');
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
	// Setting the app router and static folder
	app.use('/', express.static(path.resolve('./')));

	// Globbing static routing
	config.folders.client.forEach(function (staticPath) {
		app.use(staticPath.replace('/client', ''), express.static(path.resolve('./' + staticPath)));
	});
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
	// Globbing routing files
	config.files.server.routes.forEach(function (routePath) {
		require(path.resolve(routePath))(app);
	});
};

/**
 * Initialize the Express application
 */
module.exports.init = function (db) {
	// Initialize express app
	var app = express();

	// Initialize Express middleware
	this.initMiddleware(app);

	// Init Express view engine
	this.initViewEngine(app);

	// Initialize modules static client routes
	this.initModulesClientRoutes(app);

	// Initialize modules server routes
	this.initModulesServerRoutes(app);
	
	return app;
};
