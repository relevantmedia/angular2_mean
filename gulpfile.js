var typescript = require('gulp-tsc');

gulp.task('ts', function () {
	gulp.src([])
	.pipe(typescript())
	.pipe(gulp.dest('dest/'))
});

