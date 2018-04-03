var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
    browserSync({
        server: 'src/'
    });

    gulp.watch(['src/*.html', 'src/js/**/*.js'], ['reload']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({browsers: ['last 10 versions']}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('src/css/'))
            .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src('src/css/**/*.css')
            .pipe(cleanCSS())
            .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'));
});

gulp.task('img', function() {
    return gulp.dest('src/img/**.{jpg,jpeg,png,gif}')
            .pipe(changed('dist/img'))
            .pipe(imagemin())
            .pipe(gulp.dest('dist/img'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
            .pipe(htmlmin({
                sortAttributes: true,
                sortClassName: true,
                collapseWhitespace: true
            }))
            .pipe(gulp.dest('dist/'));
});

gulp.task('font', function() {
    return gulp.src('src/font/**/*')
            .pipe(gulp.dest('/dist/font'));
});

gulp.task('clean', function() {
    return del(['dist/'])
});

gulp.task('build', function() {
    sequence('clean', ['html', 'js', 'css', 'img', 'font']);
});

gulp.task('default', ['serve']);