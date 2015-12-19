// Karma configuration
// Generated on Fri Dec 18 2015 15:33:13 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    // basePath: '',

    // // frameworks to use
    // // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','mocha', 'chai', 'browserify'],
    plugins : [
        'karma-browserify',
        'karma-mocha',
        'karma-chai',
        'karma-chrome-launcher',
        'karma-jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/app.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'https://cdn.socket.io/socket.io-1.3.7.js',
      'app/canvas/canvas.js',
      'app/canvas/ngDraggable.js',
      'app/auth/auth.js',
      'app/choice/choice.js',
      'app/socket.js',
      'test/app.test.js'
    ],
    // list of files to exclude
    exclude: [
      ''
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'test/app.test.js': [ 'browserify' ]
    },
     browserify: {
      debug: true,
      transform: [ 'brfs' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 3000,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
