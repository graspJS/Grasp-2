var gulp = require('gulp');

var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var Server = require('karma').Server;
 
gulp.task('syntax check', function () {
  return gulp.src(['./app/*.js', './server/*js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('server tests', function () {
  return gulp.src('test/myapptest.js')
    .pipe(mocha())
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['syntax check', 'server tests', 'test']);