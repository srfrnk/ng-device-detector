var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var karma = require('karma').server;

gulp.task('default', ["minify","test"]);

gulp.task('minify', function() {
  gulp.src('ng-device-detector.js')
    .pipe(uglify())
    .pipe(concat("ng-device-detector.min.js"))
    .pipe(gulp.dest('.'))
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('watch', [], function () {
  gulp.watch(["**/*.js"], ["test","minify"]);
});
