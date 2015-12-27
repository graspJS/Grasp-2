"use strict";
var gulp = require('gulp');
var watch = require('gulp-watch');

var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

// This will keeps pipes working after error event
var plumber = require('gulp-plumber');
var karma = require('karma').server;

// Used in linting custom reporter
var map = require('map-stream');
var events = require('events');
var notify = require('gulp-notify');
var emmitter = new events.EventEmitter();
var path = require('path');
var Server = require('karma').Server;
var git = require('gulp-git');

// Custom linting reporter used for error notify
var jsHintErrorReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    file.jshint.results.forEach(function (err) {
      if (err) {
        //console.log(err);

        // Error message
        var msg = [
          path.basename(file.path),
          'Line: ' + err.error.line,
          'Reason: ' + err.error.reason
        ];

        // Emit this error event
        emmitter.emit('error', new Error(msg.join('\n')));

      }
    });

  }
  cb(null, file);
});



gulp.task('lint', function () {
  gulp.src(['./app/*.js', './server/*js'])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish')) // Console output
    .pipe(jsHintErrorReporter) // If error pop up a notify alert
    .on('error', notify.onError(function (error) {
      return error.message;
    }));

});

gulp.task('server-tests', function () {
  return gulp.src('test/myapptest.js')
    .pipe(mocha())
    .once('error', function () {
      process.exit(1);
    })
    // .once('end', function () {
    //   process.exit();
    // });
});

// gulp.task('test', function (done) {
//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });

gulp.task('karma-tests', function () {
    karma.start({
        //Weirdly, karma barfs if you don't specify a config file,
        //even if it's not needed due to passing options here.
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['Chrome'],
        frameworks: ['jasmine','mocha', 'chai', 'browserify'],
        colors: false
    });
});

gulp.task('add', function(){
  return gulp.src(['./app/*.js', './server/*js', './*.js', './*.json'])
    .pipe(git.add({args: '.'}));
});

gulp.task('commit', function(){
  return gulp.src(['./app/*.js', './server/*js', './*.js', './*.json'])
    .pipe(git.commit(['initial commit', 'gulp commit message']));
});


gulp.task('default', ['lint', 'karma-tests', 'server-tests', 'add', 'commit']);