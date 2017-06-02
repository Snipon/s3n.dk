// Get modules.
const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// Sass.
gulp.task('sass', () => (
  gulp.src('private/src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', notify.onError(error => (
      `SASS error: ${error.message}`
    ))))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false,
    }))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('public/css'))
));

// Sass watch.
gulp.task('sass:watch', () => {
  gulp.watch('private/src/scss/**/*.scss', ['sass']);
});

// Register workers.
gulp.task('default', ['sass', 'sass:watch']);
