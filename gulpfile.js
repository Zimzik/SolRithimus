  const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  path = require('path'),
  less = require('gulp-less'),
  gcmq = require('gulp-group-css-media-queries'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpIf = require('gulp-if'),
  del = require('del'),
  plumber = require('gulp-plumber'),
  webpack = require('gulp-webpack');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('less', function() {
  return gulp.src('app/less/styles.less')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('webpack', function(){
	return gulp.src('app/js/script.js')
		.pipe(webpack( require('./1webpack.config.js') ))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream());
});


gulp.task('clean', function() {
  return del('dist');
});

gulp.task('copy', function() {
  return gulp.src(['app/{fonts,img,libs,video}/**/*', 'app/index.html'], {base: 'app', since: gulp.lastRun('copy')}) 
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
});  

gulp.task('build', gulp.series('clean', gulp.parallel('copy','less','webpack')));

gulp.task('watch', function() {
  gulp.watch('./app/less/**/*.*', gulp.series('less'));
  gulp.watch('./app/js/**/*.*', gulp.series('webpack'));
  gulp.watch(['app/fonts', 'app/img', 'app/libs','app/video', 'app/index.html'], gulp.series('copy')); 
});

gulp.task('serve', function() {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('./app/less/**/*.*', gulp.series('less'));
  gulp.watch('./app/js/**/*.*', gulp.series('webpack'));
  gulp.watch(['app/fonts', 'app/img', 'app/libs','app/video', 'app/index.html'], gulp.series('copy'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('serve')));

//for Admin panel

gulp.task('adm:less', function () {
  return gulp.src('admin-panel/less/styles.less')
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./admin-panel/css'))
    .pipe(browserSync.stream());
});

gulp.task('adm:webpack', function(){
  return gulp.src('admin-panel/src/script.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('admin-panel/js'))
    .pipe(browserSync.stream());
});

gulp.task('adm:serve', function() {
  browserSync.init({
    server: './admin-panel'
  });

  gulp.watch('./admin-panel/less/**/*.*', gulp.series('adm:less'));
  gulp.watch('./admin-panel/src/**/*.*', gulp.series('adm:webpack'));
});

gulp.task('adm:build', gulp.series(gulp.parallel('adm:webpack', 'adm:less')));

gulp.task('adm:dev', gulp.series('adm:build', gulp.parallel('adm:serve')));


