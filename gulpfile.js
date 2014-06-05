var _ = require('underscore');
var autoprefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var sass = require('gulp-ruby-sass');
// var compass = require('gulp-compass');

var es = require('event-stream');
var bower = require('gulp-bower');
var gulp = require('gulp');
var replace = require('gulp-replace');

// var rjs = require('gulp-requirejs');
// var sass = require('gulp-sass');
var spawn = require('child_process').spawn;
var uglify = require('gulp-uglify');

gulp.task('bower', function() {
  bower()
    .pipe(gulp.dest('source/vendor/'));
});

// Sass
gulp.task('sass', function() {
  return gulp.src(['source/scss/*.scss', '!source/scss/_*.scss'])
    .pipe(sass({
      compass: true
    }))
    .pipe(autoprefix())
    .pipe(csso())
    .pipe(gulp.dest('source/assets/css'))
});

// Watch
gulp.task('watch', function() {
  gulp.run('sass');

  gulp.watch('source/scss/**/*.scss', function() {
    gulp.run('sass');
  });

});

gulp.task('default', ['js', 'copy']);