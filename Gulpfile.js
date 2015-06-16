var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    jade       = require('gulp-jade'),
    copy       = require('gulp-copy'),
    sass       = require('gulp-sass'),
    watch      = require('gulp-watch'),
    neat       = require('node-neat').includePaths,
    bourbon    = require('node-bourbon').includePaths,
    livereload = require('gulp-livereload');

//////////CONNECT////////////////////////////////////
gulp.task('connect', function() {
  connect.server({
    root: ['public'],
    port: 8000,
    livereload: true
  });
});
//////////SASS////////////////////////////////////
gulp.task('sass', function () {
  gulp.src('./app/**/*.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      includePaths: require('node-neat').includePaths
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./public/'))
    .pipe( connect.reload() );
});
//////////COPY////////////////////////////////////
gulp.task('copy', function () {
  gulp.src(['./app/**/*.js', './app/**/*.jpg', './app/**/*.jpeg', './app/**/*.png', './app/**/*.gif', './app/**/*.mp4'])
  .pipe(copy('./public/', {prefix:1}))
});
//////////JADE////////////////////////////////////
gulp.task('jade', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade({pretty: true, doctype: 'html'}))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./public/'))
    .pipe( connect.reload() );
});
//////////WATCH////////////////////////////////////
gulp.task('watch', ['connect'], function () {
  gulp.watch('./app/**/*', function() {
    gulp.start('build');
  });
});
//////////DEFAULT////////////////////////////////////
gulp.task('build', ['copy', 'jade', 'sass']);
gulp.task('default', ['connect', 'watch']);
