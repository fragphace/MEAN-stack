var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var sequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var src = require('vinyl-source-stream');
var browserify = require('browserify');
var coffeeify = require('coffeeify');

gulp.task('style', function () {
    return gulp.src('./styles/**/*.less')
        .pipe(less({
            paths: ['./node_modules/bootstrap/less']
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task('script', function () {
    return browserify({ debug: true })
        .add('./scripts/index.coffee')
        .transform(coffeeify)
        .bundle()
        .pipe(src('script.js'))
        .pipe(gulp.dest('./public'));
});

gulp.task('clean', function (cb) {
    del(['public/script.js', 'public/style.css', 'public/script.min.js', 'public/style.min.css'], cb);
});

gulp.task('min:script', function () {
    return gulp.src('public/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/'));
});

gulp.task('min:style',  function () {
    return gulp.src('public/style.css')
        .pipe(cssmin())
        .pipe(gulp.dest('public/'));
});

gulp.task('min', ['min:style', 'min:script']);

gulp.task('watch', function () {
    gulp.watch('scripts/**/*.coffee', ['script']);
    gulp.watch('styles/**/*.less', ['style']);
});

gulp.task('serve', ['watch'], function () {
    return nodemon({
        script: './app.coffee',
        ext: 'coffee',
        ignore: ['node_modules/**', 'scripts/*'],
        env: { NODE_ENV: 'dev' }
    });
});

gulp.task('dev', function (cb) {
    sequence('clean', 'style', 'script', cb);
});

gulp.task('dist',  function (cb) {
    sequence('dev', 'min', cb);
});
