var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
	gulp.src('./Content/sass/site.scss')
        .pipe(sass())
        .pipe(gulp.dest('./Content'));
});