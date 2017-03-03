var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');
var Server = require('karma').Server;

gulp.task('default', ["test"]);

gulp.task('minify', function () {
    gulp.src('ng-device-detector.js')
        .pipe(uglify())
        .pipe(concat("ng-device-detector.min.js"))
        .pipe(gulp.dest('.'))
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('watch', [], function () {
    gulp.watch(["**/*.js"], ["test"]);
});

gulp.task('version', ["minify"], function () {
    gulp.src(['./package.json', './bower.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'))
        .pipe(git.commit('bumps package version'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
});
