var gulp         = require('gulp'),
    del          = require('del'),
    connect      = require('gulp-connect'),
    jade         = require('gulp-jade'),
    copy         = require('gulp-copy'),
    sass         = require('gulp-ruby-sass'),
    watch        = require('gulp-watch'),
    rename       = require('gulp-rename'),
    minifycss    = require('gulp-minify-css')
    autoprefixer = require('gulp-autoprefixer');


////////////CONNECT////////////////////////////////
gulp.task('connect', function(){
  connect.server({
    root: [__dirname],
    port: 8000,
    livereload: true
  });
});
//////////SASS////////////////////////////////////

gulp.task('css', function() {
  return sass('./app/index.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./public'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public'));
});

//////////clean///////////////////////////////////

gulp.task('clean', function () {
  del(['public/**/*', '!public', '!public/vendor/**/*', '!public/vendor']);
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
gulp.task('build', ['copy', 'jade', 'css']);
gulp.task('default', ['connect', 'watch']);

gulp.task('refresh', ['build'], function() {
  gulp.src(__dirname).pipe(connect.reload());
});
