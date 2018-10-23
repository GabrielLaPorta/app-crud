const gulp = require('gulp');
const concat = require('gulp-concat');
const templateCache = require('gulp-angular-templatecache');

const scripts = require('./scripts');
const styles = require('./styles');

gulp.task('cssVendor', function () {
	gulp.src(styles)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest('./public/assets/stylesheets'))
});

gulp.task('css', function() {
    gulp.src('./app-web/**/*.css')
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/assets/stylesheets'))
});

gulp.task('jsVendor', function () {
	gulp.src(scripts)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./public/assets/javascripts'))
});

gulp.task('js', function () {
	gulp.src('./app-web/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./public/assets/javascripts'))
});

gulp.task('templatesJs', function () {
	gulp.src('./app-web/**/*.html')
		.pipe(templateCache({standalone: true}))
		.pipe(gulp.dest('./public/assets/templates'))
});

gulp.task('build', function () {
	gulp.start(['css', 'cssVendor', 'jsVendor', 'js', 'templatesJs']);
});

gulp.task('default', ['build']);