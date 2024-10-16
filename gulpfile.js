const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));

function styles() {
    return gulp.src(['./Style/Theme/game.scss', './Style/Theme/index.scss', './Style/Theme/changelog.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('./Style/Transpiled'));
}

function watch() {
    gulp.watch('./Style/**/*.scss', styles);
}

exports.styles = styles;
exports.watch = watch;
