const gulp = require('gulp')
const postcss = require('gulp-postcss')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename')
const del = require('del')
const cssnano = require('gulp-cssnano')

function clean() {
    return del(["./dist/"]);
}

function css() {
    return gulp.src('css/**/*')
        .pipe(cssnano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist/css'))
}

function js() {
    return gulp.src('js/**/*')
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist/js'))
}

function vendor() {
    return gulp.src('vendor/**/*')
        .pipe(gulp.dest('dist/vendor'))
}

function images() {
    return gulp.src('img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
}

exports.default = gulp.series(clean, gulp.parallel(css, js, vendor, images))