let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let gulpSequence = require('gulp-sequence');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
var htmlmin = require('gulp-html-minifier');

gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('styles.css'));
    return stream;
});

gulp.task('minify-css', () => {
    return gulp.src('css/styles.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./css/'));
  });

gulp.task('concat', function () {
    return gulp.src(['./js/jquery-3.2.1.slim.js', './js/popper.js', './js/bootstrap.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js/'))
});

gulp.task('uglify', function () {
    return gulp.src('./js/main.js')
    .pipe(rename('main-ugly.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
});

gulp.task('minify', function() {
    gulp.src('./index.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./'))
  });
  
gulp.task('styles', function(callback){
    gulpSequence('sass', 'minify-css', 'concat', 'uglify', 'minify')(callback)
});