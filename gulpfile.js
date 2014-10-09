var path = require('path');
var gulp = require('gulp');
var coffeeify = require('gulp-coffeeify');
var less = require('gulp-less');
var concat = require('gulp-concat');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var sequence = require('run-sequence');
var nodemon = require('gulp-nodemon');

gulp.task('less', function () {
    return gulp.src('./styles/**/*.less')
        .pipe(less({
            paths: ['./node_modules/bootstrap/less']
        }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task('browserify', function () {
    return gulp.src('./scripts/**/*.coffee')
        .pipe(coffeeify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./public'));
});

gulp.task('clean', function (cb) {
    del(['public/script.js', 'public/style.css', 'public/script.min.js', 'public/style.min.css'], cb);
});

gulp.task('uglify', function () {
    return gulp.src('public/script.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/'));
});

gulp.task('cssmin', function () {
    return gulp.src('public/style.css')
        .pipe(cssmin())
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', function () {
    gulp.watch('scripts/**/*.coffee', ['browserify']);
    gulp.watch('styles/**/*.less', ['less']);
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
    sequence('clean', 'less', 'browserify', cb);
});

gulp.task('dist',  function (cb) {
    sequence('dev', 'uglify', 'cssmin', cb);
});
