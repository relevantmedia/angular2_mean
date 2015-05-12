var gulp = require('gulp'),
	defaultAssets = require('./config/assets/default'),
	plugins = require('gulp-load-plugins')();

gulp.task('tsc', function () {
	gulp.src([defaultAssets.client.ts])
	.pipe(plugins.tsc)
	.pipe(gulp.dest('dest/'))
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
