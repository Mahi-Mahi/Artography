var _ = require('underscore');
var autoprefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var es = require('event-stream');
var bower = require('gulp-bower');
var gulp = require('gulp');
var replace = require('gulp-replace');
var rjs = require('gulp-requirejs');
var sass = require('gulp-ruby-sass');
var spawn = require('child_process').spawn;
var uglify = require('gulp-uglify');

// Bump version
gulp.task('bump-version', function() {
  spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout.on('data', function(data) {

    // Get current branch name
    var branch = data.toString();

    // Verify we're on a release branch
    if (/^release\/.*/.test(branch)) {
      var newVersion = branch.split('/')[1].trim();

      // Update client index.html
      gulp.src('./source/index.html')
        .pipe(replace(/(bust=v)(\d*\.?)*/g, '$1' + newVersion))
        .pipe(gulp.dest('./source'));

      var updateJson = function(file) {
        gulp.src(file)
          .pipe(replace(/("version" *: *")([^"]*)(",)/g, '$1' + newVersion + '$3'))
          .pipe(gulp.dest('./'));
      };

      updateJson('./bower.json');
      updateJson('./package.json');

      console.log('Successfully bumped to ' + newVersion);
    } else {
      console.error('This task should be executed on a release branch!');
    }
  });
});

// Copy
gulp.task('copy', ['sass'], function() {
  return es.concat(
    // update index.html to work when built
    gulp.src(['source/index.html'])
    .pipe(replace("require(['./js/main.js'])", "require(['./js/main.js'], function () { require(['main']); })"))
    .pipe(gulp.dest('build')),
    // copy config-require
    gulp.src(['source/js/config-require.js'])
    .pipe(uglify())
    .pipe(gulp.dest('build/js')),
    // copy vendor files
    gulp.src(['source/vendor/**/*'])
    .pipe(gulp.dest('build/vendor')),
    // copy assets
    gulp.src(['source/assets/**/*'])
    .pipe(gulp.dest('build/assets')),
    // minify requirejs
    gulp.src(['build/vendor/requirejs/require.js'])
    .pipe(uglify())
    .pipe(gulp.dest('build/vendor/requirejs')),
    // minify domReady
    gulp.src(['build/vendor/requirejs-domready/domReady.js'])
    .pipe(uglify())
    .pipe(gulp.dest('build/vendor/requirejs-domready'))
  );
});

gulp.task('bower', function() {
  bower()
    .pipe(gulp.dest('source/vendor/'));
});

// JavaScript
gulp.task('js', ['bower'], function() {
  var configRequire = require('./source/js/config-require.js');
  var configBuild = {
    baseUrl: 'source/js',
    name: 'main',
    optimize: 'none',
    out: 'main.js',
    wrap: true
  };
  var config = _(configBuild).extend(configRequire);

  return rjs(config)
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

// Sass
gulp.task('sass', function() {
  return gulp.src(['source/sass/*.scss', '!source/sass/_*.scss'])
    .pipe(sass({
      bundleExec: true,
      require: [
        './source/sass/sass_extensions.rb',
        'sass-globbing'
      ]
    }))
    .pipe(autoprefix())
    .pipe(csso())
    .pipe(gulp.dest('source/assets/css'))
});

// Watch
gulp.task('watch', function() {
  gulp.run('sass');

  gulp.watch('source/sass/**/*.scss', function() {
    gulp.run('sass');
  });

});

gulp.task('default', ['js', 'copy']);