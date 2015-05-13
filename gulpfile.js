var _ = require('lodash'),
	gulp = require('gulp'),
	defaultAssets = require('./config/assets/default'),
	runSequence = require('run-sequence'),
	plugins = require('gulp-load-plugins')();

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
	process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
	process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
	process.env.NODE_ENV = 'production';
});

// Nodemon task
gulp.task('nodemon', function () {
	return plugins.nodemon({
		script: 'server.js',
		nodeArgs: ['--debug'],
		ext: 'js,html',
		watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
	});
});

// Watch Files For Changes
gulp.task('watch', function() {
	// Start livereload
	plugins.livereload.listen();

	// Add watch rules
	gulp.watch(defaultAssets.server.views).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.server.allJS).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.client.js).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.client.css, ['csslint']).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.client.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.client.ts, ['tsc']).on('change', plugins.livereload.changed);
});


// Typescript task
gulp.task('tsc', function () {
	//var ts_config = plugins.typescript.creatproject('tsconfig.json');
	gulp.src(defaultAssets.client.ts)
	.pipe(plugins.typescript({
		typescript: require('typescript'),
		target: 'ES5',
		module: 'commonjs',
		declarationFiles: false,
		noExternalResolve: true
	}))
	.pipe(plugins.rename(function (path) {
		path.dirname = path.dirname.replace('/ts', '/js');
	}))
	.pipe(gulp.dest('./modules/'));
});

// Sass task
gulp.task('sass', function () {
	return gulp.src(defaultAssets.client.sass)
		.pipe(plugins.sass())
		.pipe(plugins.rename(function (path) {
			path.dirname = path.dirname.replace('/scss', '/css');
		}))
		.pipe(gulp.dest('./modules/'));
});

// CSS linting task
gulp.task('csslint', function (done) {
	return gulp.src(defaultAssets.client.css)
		.pipe(plugins.csslint('.csslintrc'))
		.pipe(plugins.csslint.reporter())
		.pipe(plugins.csslint.reporter(function (file) {
			if (!file.csslint.errorCount) {
				done();
			}
		}));
});

// Lint CSS and JavaScript files.
gulp.task('lint', function(done) {
	runSequence('sass', 'tsc', ['csslint'], done);
});

// Run the project in development mode
gulp.task('default', function(done) {
	runSequence('env:dev', 'lint', ['nodemon', 'watch'], done);
});
