'use strict';

var gulp = require('gulp')
var source = require('vinyl-source-stream')
var rename = require('rename')
var browserify = require('browserify')
var glob = require('glob')
var mergeStream = require('merge-stream')
var plumber = require('gulp-plumber')
var jade = require('gulp-jade')

gulp.task('js', function(done) {
	glob('./examples/src/**/*.js', function(err, files) {
		if (err) done(err);
		var tasks = files.map(function(entry) {
			console.log(entry);
			return browserify({
					entries: [entry]
				})
				.transform('babelify')
				.bundle()
				.pipe(source(entry))
				// .pipe(rename({
				// 	extname: '.bundle.js'
				// }))
				.pipe(gulp.dest('./examples/js'));
		});
		mergeStream(tasks).resume().on('end', done);
	})
});

gulp.task('jade', function() {
	return gulp.src('./examples/src/jade/*.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./examples'))
		.pipe(plumber.stop())
});

gulp.task('default', ['js', 'jade'])
