var gulp         = require('gulp'),
    del          = require('del'),
    connect      = require('gulp-connect'),
    jade         = require('gulp-jade'),
    copy         = require('gulp-copy'),
    sass         = require('gulp-sass'),
    watch        = require('gulp-watch'),
    rename       = require('gulp-rename'),
    minifycss    = require('gulp-minify-css')
    autoprefixer = require('gulp-autoprefixer');


////////////CONNECT////////////////////////////////
gulp.task('connect', function(){
  connect.server({
    root: [__dirname],
    port: 7000,
    livereload: true
  });
});
//////////SASS////////////////////////////////////
gulp.task('sass', function() {
  return gulp.src('./app/index.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./public'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./public'));
});

//////////clean///////////////////////////////////
gulp.task('clean', function () {
  del(['public/img/**/*', '!public/img', '!public/vendor/**/*', '!public/vendor']);
});

//////////COPY////////////////////////////////////
gulp.task('copy', ['clean'], function () {
  return gulp.src(['./app/**/*.js', './app/**/*.jpg', './app/**/*.jpeg', './app/**/*.png', './app/**/*.gif', './app/**/*.mp4', './app/**/*.ico'])
  .pipe(copy('./public', {prefix:1}))
});

//////////JADE////////////////////////////////////
gulp.task('jade', function() {
  gulp.src('./app/**/*.jade')
    .pipe(jade({pretty: true, doctype: 'html'}))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./'))
});
/////////////WATCH///////////////////////////////////
gulp.task('watch', ['connect'], function() {
  gulp.watch('./app/**/*', function(){
    gulp.start('refresh');
  });
});


//////////DEFAULT////////////////////////////////////
gulp.task('build', ['copy', 'jade', 'sass']);
gulp.task('default', ['watch']);

gulp.task('refresh', ['build'], function() {
  gulp.src(__dirname).pipe(connect.reload());
});
