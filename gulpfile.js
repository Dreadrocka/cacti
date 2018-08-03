let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let htmlmin = require('gulp-html-minifier');
let browserSync = require('browser-sync').create();

gulp.task('watch', function() { //watch function for browser

    browserSync.init({
        server: "./live"
    });

    gulp.watch(['/scss/*.scss",./*.html'], ['styles']).on('change', browserSync.reload);
});

gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('./css/'))
      .pipe(rename('styles.css'))
   return stream;
});

gulp.task('minify-css', () => {
    return gulp.src('css/styles.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./live/css'));
  });

gulp.task('styles', function(callback){
  gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('concat', () => {
    return gulp.src(['./js/jquery-3.2.1.slim.js', './js/popper.js', './js/bootstrap.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(',/live/js/'))
});

gulp.task('uglify', () => {
    return gulp.src('./js/main.js')
    .pipe(rename('main-ugly.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./live/'))
});

gulp.task('minify', () => {
    gulp.src('./index.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./live/'))
  });

//minify js

// Gulp task to minify JavaScript files
gulp.task('scripts',() => {
   gulp.src('./src/js/**/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./live/js'))
});

