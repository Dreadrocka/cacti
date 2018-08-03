let gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    gulpSequence = require('gulp-sequence'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es').default,
    htmlmin = require('gulp-html-minifier'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
    watch = require('gulp-watch');

gulp.task('sass', () => {
    gulp.src('./scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css/'))
    // .pipe(rename('styles.css'))
});

gulp.task('minify-css', () => {
    gulp.src('./css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./live/css/'))
  });

gulp.task('concat', () => {
    gulp.src(['./js/jquery-3.2.1.slim.js', './js/popper.js', './js/bootstrap.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./live/js/'))
});

gulp.task('uglify', () => {
    gulp.src('./js/main.js')
    // .pipe(rename('main-ugly.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./live/js/'))
});

gulp.task('minify', () => {
    gulp.src('./*.html')
    // .pipe(rename({suffix: '.min'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./live/'))
});
  
gulp.task('styles', function(callback){
    gulpSequence('sass', 'minify-css', 'concat', 'uglify', 'minify')(callback)
});

// gulp.task('refresh', function () {
//     browserSync.init({
//         server: {
//             baseDir: './live/'
//         }
//     });
    
//     gulp.watch('./scss/*.scss').on("change", function() {
//         gulp.start('styles');
//         reload();
//     })
// });